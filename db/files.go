package db

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// TODO return (string, error)
func GetImageData(imagePath string) string {
	file := GetFile(imagePath)
	image := base64.RawStdEncoding.EncodeToString(file)

	return fmt.Sprintf("data:image;base64,%s", image)
}

func GetMokuro(mokuroPath string) Mokuro {
	file := GetFile(mokuroPath)
	var mokuro Mokuro
	if err := json.Unmarshal(file, &mokuro); err != nil {
		log.Panicln("Error unmarshalling Mokuro file:", err)
	}
	return mokuro
}

func GetFile(path string) []byte {
	log.Println("Fetching file:", path)
	fileBuffer := bytes.NewBuffer(nil)

	if _, err := MangaBucket.DownloadToStreamByName(context.TODO(), path, fileBuffer); err != nil {
		log.Panicln("Error creating download stream:", err)
	}

	log.Println("Successfully fetched file from", path)
	return fileBuffer.AvailableBuffer()
}

func UploadFile(fileName string, fileData []byte, manga Manga) {
	uploadOpts := options.GridFSUpload().SetChunkSizeBytes(1048576).SetMetadata(manga)

	fmt.Printf("Uploading file '%s'...\n", fileName)

	uploadStream, err := MangaBucket.OpenUploadStream(context.TODO(), fileName, uploadOpts)
	if err != nil {
		log.Panicln("Failed to open upload stream:", err)
	}

	bytes, err := uploadStream.Write(fileData)
	if err != nil {
		log.Panicln("Failed to write file data: ", err)
	}

	if err := uploadStream.Close(); err != nil {
		log.Panicln("Failed to close upload stream:", err)
	}

	fmt.Printf("File '%s' uploaded with %d bytes written\n", fileName, bytes)
}
