package main

import (
	"log"
	"net/http"

	"github.com/Bittorn/Furiyomi/handlers"
)

func main() {
	mux := http.NewServeMux()

	// Handle routes
	mux.HandleFunc("/", handlers.Page)

	// Serve static assets
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	log.Println("Server starting on :3000")
	log.Fatal(http.ListenAndServe(":3000", mux))
	defer log.Println("Application shutting down, goodbye!")
}
