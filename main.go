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

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
