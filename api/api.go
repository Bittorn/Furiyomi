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

	reader, err := r.MultipartReader()
	if err != nil {
		http.Error(w, "Invalid request type", http.StatusUnsupportedMediaType)
		log.Panicf("Error creating reader: %v", err)
		return
	}

	for {
		// To protect against malicious inputs,
		// Reader.NextPart and Reader.NextRawPart limit the number of
		// headers in a part to 10000 and Reader.ReadForm limits the total
		// number of headers in all FileHeaders to 10000.

		// These limits may be adjusted with
		// GODEBUG=multipartmaxheaders=<values>.

		// Reader.ReadForm further limits the number of parts
		// in a form to 1000. This limit may be adjusted with
		// GODEBUG=multipartmaxparts=<value>.

		part, err := reader.NextPart()
		if err == io.EOF {
			break
		}
		data, err := io.ReadAll(part)
		if err != nil {
			log.Panicf("Error when reading part: %s", err)
		}

		fileName := part.FileName()

		fileNameArray := strings.Split(fileName, "/")

		if manga.Romaji == "" {
			manga.Romaji = fileNameArray[0]
		}

		fileNameArray[0] = db.GenerateRef(fileName)

		if manga.Ref == "" {
			manga.Ref = fileNameArray[0]
		}

		fileName = strings.Join(fileNameArray, "/")

		if db.ShouldIgnoreFile(fileName) {
			return
		}

		// If base volume file (.mokuro), add it to entry
		if db.IsMokuro(fileName) {
			volume := db.Volume{
				Title: strings.ReplaceAll(fileName, ".mokuro", ""),
			}
			manga.Volumes = append(manga.Volumes, volume)
		}

		db.UploadFile(fileName, data, manga)

		part.Close()
	}

	log.Printf("File upload complete\nUpdating manga collection...\n")

	db.WriteManga(manga)

	log.Println("Manga collection successfully updated")

	go metadata.UpdateMetadata(manga)
}

func Health(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "OK")
}
