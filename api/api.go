package api

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/Bittorn/Furiyomi/db"
)

func Image(w http.ResponseWriter, r *http.Request) {
	image := r.PathValue("image")
	log.Printf("Received API image request for: %s\n", image)

	if len(image) > 0 {
		imageData := db.GetImageData(image)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(imageData)
	} else {
		log.Printf("Invalid API request")
		http.Error(w, "Invalid API request", http.StatusBadRequest)
	}
}

func Health(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "OK")
}
