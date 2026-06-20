package main

import (
	"log"
	"net/http"

	"github.com/Bittorn/Furiyomi/handlers"
)

func main() {
	mux := http.NewServeMux()

	// Handle routes
	mux.HandleFunc("GET /", handlers.Home)
	mux.HandleFunc("GET /titles", handlers.NotFound)
	mux.HandleFunc("GET /upload", handlers.NotFound)
	mux.HandleFunc("GET /about", handlers.About)
	mux.HandleFunc("GET /dashboard", handlers.NotFound)

	// Serve static assets
	mux.Handle("GET /static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	log.Println("Server starting on :3000")
	log.Fatal(http.ListenAndServe(":3000", mux))
	defer log.Println("Application shutting down, goodbye!")
}
