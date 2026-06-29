package main

import (
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/Bittorn/Furiyomi/db"
	"github.com/Bittorn/Furiyomi/handlers"
	"github.com/joho/godotenv"
)

var port, mongoUri string

func main() {
	handleEnv()

	mux := http.NewServeMux()

	log.Println("Server starting...")

	// Handle routes
	mux.HandleFunc("GET /", handlers.Home)
	mux.HandleFunc("GET /titles", handlers.Titles)
	mux.HandleFunc("GET /titles/{ref}", handlers.MangaDetail)
	mux.HandleFunc("GET /upload", handlers.NotFound)
	mux.HandleFunc("GET /about", handlers.About)
	mux.HandleFunc("GET /login", handlers.Login)
	mux.HandleFunc("POST /login", handlers.Login)

	// Protected routes
	mux.Handle("GET /dashboard", checkAuthMiddleware(http.HandlerFunc(handlers.Dashboard)))

	// Serve static assets
	mux.Handle("GET /static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	log.Println("Routes initialised")

	log.Println("Server started on port", port)
	log.Fatal(http.ListenAndServe(":"+port, logRequestMiddleware(secureHeadersMiddleware(mux))))
}

func handleEnv() {
	present := false

	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	port, present = os.LookupEnv("PORT")
	_, err = strconv.Atoi(port)
	if !present || err != nil {
		log.Println("PORT environment variable not set or invalid, assuming default 3000")
		port = "3000"
	} else {
		log.Println("PORT environment variable parsed as " + port)
	}

	mongoUri, present = os.LookupEnv("MONGODB_URI")
	if !present || mongoUri == "" {
		log.Println("MONGODB_URI environment variable not set, assuming default " + mongoUri)
		mongoUri = "mongodb://admin:pass@127.0.0.1:27017"
	} else {
		log.Println("MONGO_URI environment variable parsed as " + mongoUri)
	}

	disableDb, present := os.LookupEnv("DISABLE_DB")
	disableDbBool, err := strconv.ParseBool(disableDb)
	if !present || err != nil || !disableDbBool {
		db.MongoInit(mongoUri)
	} else {
		log.Println("DISABLE_DB is true, will not connect to MongoDB")
	}
}
