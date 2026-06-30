package api

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/Bittorn/Furiyomi/db"
	"github.com/Bittorn/Furiyomi/metadata"
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

func Upload(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	manga := db.Manga{
		UploadDate: time.Now().Unix(),
	}

	log.Println("Received API upload request")

	err := r.ParseMultipartForm(256 << 20) // 256 MiB

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.Panicf("Error parsing form: %v", err)
		return
	}

	files := r.MultipartForm.File["files"]
	paths := r.MultipartForm.Value["paths"]

	for idx, fileHeader := range files {
		path := paths[idx]

		file, err := fileHeader.Open()
		if err != nil {
			log.Panicln("Error when reading file:", err)
		}

		data, _ := io.ReadAll(file)

		pathArray := strings.Split(path, "/")

		if manga.Romaji == "" {
			manga.Romaji = pathArray[0]
		}

		pathArray[0] = db.GenerateRef(pathArray[0])

		if manga.Ref == "" {
			manga.Ref = pathArray[0]
		}

		path = strings.Join(pathArray, "/")

		if !db.ShouldIgnoreFile(path) {
			// If base volume file (.mokuro), add it to entry
			if db.IsMokuro(path) {
				volume := db.Volume{
					Title: strings.ReplaceAll(pathArray[len(pathArray)-1], ".mokuro", ""),
				}
				manga.Volumes = append(manga.Volumes, volume)
			}

			db.UploadFile(path, data, manga)
		}

		file.Close()
	}

	log.Println("File upload complete")
	log.Println("Updating manga collection...")

	db.WriteManga(manga)

	log.Println("Manga collection successfully updated")

	go metadata.UpdateMetadata(manga)
}

func Health(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "OK")
}
