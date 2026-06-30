package db

import (
	"context"
	"log"
)

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
