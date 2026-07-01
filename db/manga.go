package db

import (
	"context"
	"log"

	"github.com/Bittorn/Furiyomi/globals"
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

	if globals.DisableDb {
		return mockAllManga()
	}

	CountDocuments(bson.D{})

	cursor, err := MangaCollection.Find(context.TODO(), bson.D{})

	var results []Manga
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Panicln("Error parsing results:", err)
	}

	return results
}

func SearchManga(search string) []Manga {
	if globals.DisableDb {
		return mockAllManga()
	}

	filter := bson.D{{Key: "title.romaji", Value: search}}

	CountDocuments(filter)

	cursor, err := MangaCollection.Find(context.TODO(), filter)

	var results []Manga
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Panicln("Error parsing results:", err)
	}

	return results
}

func CountDocuments(filter bson.D) int64 {
	count, err := MangaCollection.CountDocuments(context.TODO(), filter)

	if err != nil {
		log.Panicln("Error counting documents:", err)
	}

	if count == 0 {
		log.Println("Manga collection is empty")
	}

	return count
}

func GetManga(ref string) (Manga, bool) {
	if globals.DisableDb {
		return mockManga(ref), true
	}

	filter := bson.D{{Key: "ref", Value: ref}}
	result := MangaCollection.FindOne(context.TODO(), filter)

	if err := result.Err(); err != nil {
		log.Println("Could not find manga", ref)
		return Manga{}, false
	}

	var manga Manga
	err := result.Decode(&manga)
	if err != nil {
		log.Panicln("Error parsing response:", err)
	}

	return manga, true
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
