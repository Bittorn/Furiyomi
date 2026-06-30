package metadata

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/Bittorn/Furiyomi/db"
)

type AniList struct {
	Data Data `json:"data"`
}

type Data struct {
	Page Page `json:"Page"`
}

type Page struct {
	Media []Media `json:"media"`
}

type Media struct {
	ID          int        `json:"id"`
	SiteURL     string     `json:"siteUrl"`
	Description string     `json:"description"`
	Title       db.Title   `json:"title"`
	StartDate   StartDate  `json:"startDate"`
	Genres      []string   `json:"genres"`
	Tags        []Tag      `json:"tags"`
	CoverImage  CoverImage `json:"coverImage"`
}

type StartDate struct {
	Year int `json:"year"`
}

type Tag struct {
	Name           string `json:"name"`
	IsMediaSpoiler bool   `json:"isMediaSpoiler"`
}

type CoverImage struct {
	ExtraLarge string `json:"extraLarge"`
}

var query = `
	query ($search: String!) {
		Page {
			media(search: $search, type: MANGA) {
				id
				siteUrl
				description
				title {
					romaji
					english
					native
				}
				startDate {
					year
				}
				genres
				tags {
					name
					isMediaSpoiler
				}
				coverImage {
					extraLarge
				}
			}
		}
	}
`

func queryAnilist(search string) AniList {
	log.Println("Querying AniList for:", search)

	// From https://docs.anilist.co/guide/graphql/

	// Define our query variables and values that will be used in the query request
	// this is bad practice apparently but who cares
	payload := map[string]interface{}{
		"query": query,
		"variables": map[string]interface{}{
			"search": search,
		},
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		log.Panicln("Error marshalling payload data:", err)
	}

	request, err := http.NewRequest(http.MethodPost, "https://graphql.anilist.co/", bytes.NewBuffer(jsonData))
	if err != nil {
		log.Panicln("Error creating HTTP request:", err)
	}

	// Set headers correctly
	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Accept", "application/json")

	// Make the request
	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		log.Panicln("Error sending HTTP request:", err)
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		log.Panicln("Error reading response:", err)
	}

	var anilist AniList
	if err := json.Unmarshal(body, &anilist); err != nil {
		log.Panicln("Error unmarshalling response:", err)
	}

	return anilist
}
