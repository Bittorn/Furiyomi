package main

import (
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/Bittorn/Furiyomi/api"
	"github.com/Bittorn/Furiyomi/db"
	"github.com/Bittorn/Furiyomi/globals"
	"github.com/Bittorn/Furiyomi/handlers"
	"github.com/joho/godotenv"
)

func main() {
	handleEnv()

	mux := http.NewServeMux()

	log.Println("Server starting...")

	// Frontend routes
	mux.HandleFunc("/", handlers.Home)
	mux.HandleFunc("/titles", handlers.Titles)
	mux.HandleFunc("/titles/{ref}", handlers.MangaDetail)
	mux.HandleFunc("/upload", handlers.Upload)
	mux.HandleFunc("/about", handlers.About)
	mux.HandleFunc("/login", handlers.Login)

	// API routes
	mux.HandleFunc("/api/image/{image}", api.Image)
	mux.HandleFunc("/api/upload", api.Upload)
	mux.HandleFunc("/api/health", api.Health)

	// Protected routes
	mux.Handle("/dashboard", checkAuthMiddleware(http.HandlerFunc(handlers.Dashboard)))

	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	log.Println("Routes initialised")

	log.Println("Server started on port", globals.Port)
	log.Fatal(http.ListenAndServe(":"+globals.Port, logRequestMiddleware(secureHeadersMiddleware(mux))))
}

func handleEnv() {
	present := false

	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	globals.Port, present = os.LookupEnv("PORT")
	_, err = strconv.Atoi(globals.Port)
	if !present || err != nil {
		log.Println("PORT environment variable not set or invalid, assuming default 3000")
		globals.Port = "3000"
	} else {
		log.Println("PORT environment variable parsed as", globals.Port)
	}

	globals.MongoUri, present = os.LookupEnv("MONGODB_URI")
	if !present || globals.MongoUri == "" {
		log.Println("MONGODB_URI environment variable not set, assuming default " + globals.MongoUri)
		globals.MongoUri = "mongodb://admin:pass@127.0.0.1:27017"
	} else {
		log.Println("MONGO_URI environment variable parsed as", globals.MongoUri)
	}

	disableDbString, present := os.LookupEnv("DISABLE_DB")
	globals.DisableDb, err = strconv.ParseBool(disableDbString)
	if !present || err != nil || !globals.DisableDb {
		db.MongoInit(globals.MongoUri)
	} else {
		log.Println("DISABLE_DB is true, will not connect to MongoDB")
	}
}
