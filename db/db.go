package db

import (
	"context"

	"log"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// region Types/Variables

type Manga struct {
	Id          *int   `json:"id,omitempty" bson:"_id,omitempty"`
	Ref         string `json:"ref" bson:"ref"`
	UploadDate  int64  `json:"upload_date" bson:"upload_date"`
	AnilistId   int    `json:"anilist_id" bson:"anilist_id"`
	Title       `json:"title" bson:"title"`
	Year        int      `json:"year" bson:"year"`
	Genres      []string `json:"genres" bson:"genres"`
	Tags        []string `json:"tags" bson:"tags"`
	Cover       string   `json:"cover" bson:"cover"`
	CoverRemote *string  `json:"cover_remote,omitempty" bson:"cover_remote,omitempty"`
	Link        string   `json:"link" bson:"link"`
	Description string   `json:"description" bson:"description"`
	Volumes     []Volume `json:"volumes" bson:"volumes"`
}

type Title struct {
	Romaji  string `json:"romaji" bson:"romaji"`
	English string `json:"english" bson:"english"`
	Native  string `json:"native" bson:"native"`
}

type Volume struct {
	Title string  `json:"title" bson:"title"`
	Cover *string `json:"cover,omitempty" bson:"cover,omitempty"`
}

type User struct {
	Id       *int   `json:"id,omitempty" bson:"_id,omitempty"`
	Username string `json:"username" bson:"username"`
	Password string `json:"password" bson:"password"`
}

type Mokuro struct {
	Version    string `json:"version" bson:"version"`
	Title      string `json:"title" bson:"title"`
	TitleUUID  string `json:"title_uuid" bson:"title_uuid"`
	Volume     string `json:"volume" bson:"volume"`
	VolumeUUID string `json:"volume_uuid" bson:"volume_uuid"`
	Pages      []Page `json:"pages" bson:"pages"`
}

type Page struct {
	Version   string  `json:"version" bson:"version"`
	ImgWidth  int     `json:"img_width" bson:"img_width"`
	ImgHeight int     `json:"img_height" bson:"img_height"`
	Blocks    []Block `json:"blocks" bson:"blocks"`
	ImgPath   string  `json:"img_path" bson:"img_path"`
}

type Block struct {
	// TODO see if int should be replaced with float/float64
	Box         []int     `json:"box" bson:"box"`
	Vertical    bool      `json:"vertical" bson:"vertical"`
	FontSize    int       `json:"font_size" bson:"font_size"`
	LinesCoords [][][]int `json:"lines_coords" bson:"lines_coords"`
	Lines       []string  `json:"lines" bson:"lines"`
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
