package metadata

import (
	"fmt"
	"log"
	"regexp"
	"slices"
	"strconv"
	"strings"
	"unicode"

	"github.com/Bittorn/Furiyomi/db"
)

func sortVolumes(a, b db.Volume) int {
	// This is some bullshit code right here

	ar := []rune(a.Title)
	br := []rune(b.Title)

	ia := 0
	ib := 0

	for ia < len(ar) && ib < len(br) {
		ra := ar[ia]
		rb := br[ib]

		// First: compare numbers
		if unicode.IsDigit(ra) && unicode.IsDigit(rb) {
			startA := ia
			for ia < len(ar) && unicode.IsDigit(ar[ia]) {
				ia++
			}

			startB := ib
			for ib < len(br) && unicode.IsDigit(br[ib]) {
				ib++
			}

			na, _ := strconv.Atoi(string(ar[startA:ia]))
			nb, _ := strconv.Atoi(string(br[startB:ib]))

			if na < nb {
				return -1
			}
			if na > nb {
				return 1
			}
		}

		la := unicode.ToLower(ra)
		lb := unicode.ToLower(rb)

		// Second: sort by letters
		if la != lb {
			if la < lb {
				return -1
			}
			return 1
		}

		// Third: sort by case
		if ra != rb {
			if ra < rb {
				return -1
			}
			return 1
		}

		ia++
		ib++
	}

	// Fourth: compare by length
	if ia < len(ar) {
		return 1
	}
	if ib < len(br) {
		return -1
	}
	return 0
}

func UpdateMetadata(manga db.Manga) {
	log.Println("Updating metadata for", manga.Ref)

	manga.Cover = ""

	// you have no idea how long it took to get sorting right
	slices.SortFunc(manga.Volumes, sortVolumes)

	for idx, volume := range manga.Volumes {
		volumePath := fmt.Sprintf("%s/%s", manga.Ref, volume.Title)
		mokuroPath := volumePath + ".mokuro"
		mokuro := db.GetMokuro(mokuroPath)

		coverPath := fmt.Sprintf("%s/%s", volumePath, mokuro.Pages[0].ImgPath)
		manga.Volumes[idx].Cover = &coverPath

		if manga.Cover == "" {
			manga.Cover = coverPath
		}
	}

	// TODO allow manual selection of results

	anilist := queryAnilist(manga.Romaji).Data.Page.Media

	if len(anilist) == 0 {
		log.Println("Found no results for ", manga.Romaji)
	}

	manga.AnilistId = anilist[0].ID
	manga.Title = anilist[0].Title
	manga.Year = anilist[0].StartDate.Year
	manga.Link = anilist[0].SiteURL
	manga.Genres = anilist[0].Genres
	manga.Tags = processTags(anilist[0].Tags)
	manga.Description = formatDescription(anilist[0].Description)
	manga.CoverRemote = &anilist[0].CoverImage.ExtraLarge

	if manga.Cover == "" {
		manga.Cover = *manga.CoverRemote
	}

	db.WriteManga(manga)

	log.Println("Metadata update complete")
}

func processTags(tags []Tag) []string {
	// TODO allow spoiler tags to be an option
	log.Println("Processing AniList tags...")
	var toReturn []string
	for _, tag := range tags {
		if !tag.IsMediaSpoiler {
			toReturn = append(toReturn, tag.Name)
		}
	}
	return toReturn
}

func formatDescription(description string) string {
	// Get rid of all HTML tags and other AniList-specific stuff
	log.Println("Formatting AniList description...")
	description = regexp.MustCompile(`<[^>]*>`).ReplaceAllString(description, "")
	if i := strings.Index(description, "(Source"); i != -1 {
		description = description[:i]
	}
	return description
}
