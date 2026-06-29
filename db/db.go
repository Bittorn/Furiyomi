package db

import (
	"context"
	"errors"
	"log"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// region Types/Variables

type Manga struct {
	Id         *int `json:"id,omitempty" bson:"_id,omitempty"`
	Ref        string
	UploadDate int `json:"upload_date" bson:"upload_date"`
	AnilistId  int `json:"anilist_id" bson:"anilist_id"`
	Title
	Year        int
	Genres      []string
	Tags        []string
	Cover       string
	CoverRemote *string `json:"cover_remote,omitempty" bson:"cover_remote,omitempty"`
	Link        string
	Description string
	Volumes     []Volume
}

type Title struct {
	Romaji  string
	English string
	Native  string
}

type Volume struct {
	Title string
	Cover *string `json:"cover,omitempty" bson:"cover,omitempty"`
}

type User struct {
	Id       *int `json:"id,omitempty" bson:"_id,omitempty"`
	Username string
	Password string
}

var Database *mongo.Database
var MangaCollection, UsersCollection *mongo.Collection
var MangaBucket *mongo.GridFSBucket

// endregion

func MongoInit(uri string) {
	log.Println("Connecting to MongoDB at", uri)

	ctx := context.Background()

	client, err := mongo.Connect(options.Client().
		ApplyURI(uri))
	if err != nil {
		log.Println("Unable to connect to MongoDB")
		panic(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Println("Unable to connect to MongoDB")
		log.Fatalln(err)
	} else {
		log.Println("MongoDB successfully connected")
	}

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	Database = client.Database("furiyomi")
	MangaCollection = Database.Collection("manga")
	UsersCollection = Database.Collection("users")
	MangaBucket = Database.GridFSBucket()
}

// region Manga

func WriteManga(manga Manga) {
	filter := bson.D{{Key: "ref", Value: manga.Ref}}
	update := bson.D{{Key: "$set", Value: manga}}
	opts := options.UpdateOne().SetUpsert(true)
	result, err := MangaCollection.UpdateOne(context.TODO(), filter, update, opts)

	if err != nil {
		panic(err)
	}

	if !result.Acknowledged {
		log.Panicln("Manga write request not acknowledged")
	}

	if result.UpsertedCount == 0 {
		log.Printf("Updated manga %s\n", manga.Ref)
	} else {
		log.Printf("Added manga %s with _id %v\n", manga.Ref, result.UpsertedID)
	}
}

func GetAllManga() []Manga {

	if true {
		return mockAllManga()
	}

	count, err := MangaCollection.CountDocuments(context.TODO(), bson.D{})

	if err != nil {
		panic(err)
	}

	if count == 0 {
		log.Printf("Manga collection is empty")
	}

	cursor, err := MangaCollection.Find(context.TODO(), bson.D{})

	var results []Manga
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}

	return results
}

func GetManga(ref string) (Manga, error) {

	if true {
		return mockManga(ref)
	}

	filter := bson.D{{Key: "ref", Value: ref}}
	result := MangaCollection.FindOne(context.TODO(), filter)

	var manga Manga
	err := result.Decode(manga)
	if err != nil {
		return Manga{}, err
	}

	return manga, nil
}

func DeleteManga(manga Manga) {
	result, err := MangaCollection.DeleteOne(context.TODO(), manga)
	if err != nil {
		panic(err)
	}

	if !result.Acknowledged {
		log.Panicln("Manga delete request not acknowledged")
	} else if result.DeletedCount == 0 {
		log.Printf("Manga %s not found to be deleted\n", manga.Ref)
	} else {
		log.Printf("Removed manga %s\n", manga.Ref)
	}
}

// endregion

// region Users

func WriteUser(user User) {
	// TODO upserting and value changing
	result, err := UsersCollection.InsertOne(context.TODO(), user)

	// this shouldn't error unless something is spectacularly wrong
	if err != nil {
		panic(err)
	}

	if result.Acknowledged {
		log.Printf("Added user %s with _id %v\n", user.Username, result.InsertedID)
	} else {
		log.Panicln("User write request not acknowledged")
	}
}

func DeleteUser(user User) {
	result, err := UsersCollection.DeleteOne(context.TODO(), user)
	if err != nil {
		panic(err)
	}

	if !result.Acknowledged {
		log.Panicln("User delete request not acknowledged")
	} else if result.DeletedCount == 0 {
		log.Printf("User %s not found to be deleted\n", user.Username)
	} else {
		log.Printf("Removed user %s\n", user.Username)
	}
}

// endregion

// region Mock DB

var mockMangaEntry = Manga{
	Ref:        "test",
	UploadDate: 1,
	AnilistId:  1,
	Title: Title{
		Romaji:  "Tesuto",
		English: "Test",
		Native:  "テスト",
	},
	Year:        1,
	Genres:      []string{"Action"},
	Tags:        []string{"Slice of Life"},
	Cover:       "notfound.png",
	Link:        "https://windtempos.com",
	Description: "This is a test manga",
	Volumes: []Volume{
		{
			Title: "Volume 1",
		},
	},
}

func mockAllManga() []Manga {
	if false {
		log.Println("Mock DB returning no manga")
		return []Manga{}
	}

	log.Println("Mock DB returning test manga")
	return []Manga{
		mockMangaEntry,
	}
}

func mockManga(ref string) (Manga, error) {
	if ref == mockMangaEntry.Ref {
		return mockMangaEntry, nil
	}
	return Manga{}, errors.New("No manga found")
}

// endregion
