package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

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
