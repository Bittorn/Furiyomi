package main

import (
	"log"
	"net/http"

	"github.com/Bittorn/Furiyomi/handlers"
)

func main() {
	mux := http.NewServeMux()

	// Routes
	mux.HandleFunc("/", handlers.Page)

	// Static assets
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
