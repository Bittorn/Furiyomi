package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/Bittorn/Furiyomi/handlers"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func mongoInit(uri string) {
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
}

func main() {
	// Environment stuff
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	port, portPresent := os.LookupEnv("PORT")
	_, portErr := strconv.Atoi(port)
	if !portPresent || portErr != nil {
		log.Println("PORT environment variable not set, assuming default 3000")
		port = "3000"
	}

	mongoUri, mongoUriPresent := os.LookupEnv("MONGODB_URI")
	if !mongoUriPresent || mongoUri == "" {
		log.Println("MONGODB_URI environment variable not set, assuming default :27017")
		mongoUri = "mongodb://127.0.0.1:27017"
	}

	mux := http.NewServeMux()

	log.Println("Server starting...")

	// Handle routes
	mux.HandleFunc("GET /", handlers.Home)
	mux.HandleFunc("GET /titles", handlers.NotFound)
	mux.HandleFunc("GET /upload", handlers.NotFound)
	mux.HandleFunc("GET /about", handlers.About)
	mux.HandleFunc("GET /login", handlers.Login)
	mux.HandleFunc("POST /login", handlers.Login)

	// Protected routes
	mux.Handle("GET /dashboard", checkAuthMiddleware(http.HandlerFunc(handlers.Dashboard)))

	// Serve static assets
	mux.Handle("GET /static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	log.Println("Routes initialised")

	// Should enable MongoDB
	disableDb, disableDbPresent := os.LookupEnv("DISABLE_DB")
	disableDbBool, disableDbErr := strconv.ParseBool(disableDb)
	if !disableDbPresent || disableDbErr != nil || !disableDbBool {
		mongoInit(mongoUri)
	} else {
		log.Println("DISABLE_DB is true, will not connect to MongoDB")
	}

	log.Println("Server started on port", port)
	log.Fatal(http.ListenAndServe(":"+port, logRequestMiddleware(secureHeadersMiddleware(mux))))
}
