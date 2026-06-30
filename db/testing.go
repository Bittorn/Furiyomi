package db

import (
	"log"
)

var mockMangaEntry = Manga{
	Ref:        "test",
	UploadDate: 1,
	AnilistId:  1,
	Title: Title{
		Romaji:  "Tesuto",
		English: "Test",
		Native:  "テスト",
	},
	Year:        1,
	Genres:      []string{"Action"},
	Tags:        []string{"Slice of Life"},
	Cover:       "notfound.png",
	Link:        "https://windtempos.com",
	Description: "This is a test manga",
	Volumes: []Volume{
		{
			Title: "Volume 1",
		},
	},
}

func mockAllManga() []Manga {
	if false {
		log.Println("Mock DB returning no manga")
		return []Manga{}
	}

	log.Println("Mock DB returning test manga")
	return []Manga{
		mockMangaEntry,
	}
}

func mockManga(ref string) Manga {
	if ref == mockMangaEntry.Ref {
		return mockMangaEntry
	}
	return Manga{}
}
