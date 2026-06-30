package db

import (
	"log"
	"strings"
	"unicode"
)

var filesToIgnore = []string{
	".DS_Store",
	".ds_store",
	".Thumbs.db",
	".tmp",
	".TemporaryItems",
	".Trashes",
	".Trash",
	".fseventd",
	".nfs",
	"_ocr",
}

func ShouldIgnoreFile(name string) bool {
	isMatch := false

	for _, file := range filesToIgnore {
		if isMatch {
			break
		}

		isMatch = strings.Contains(name, file)
		log.Printf("File '%s' matches ignore rule '%s'", name, file)
	}

	return isMatch
}

func IsMokuro(name string) bool {
	if strings.HasSuffix(name, ".mokuro") {
		log.Printf("File '%s' is mokuro file", name)
		return true
	} else {
		return false
	}
}

func GenerateRef(name string) string {
	// TODO does this even work?
	rs := make([]rune, 0, len(name))
	for _, r := range name {
		if r <= 127 && !unicode.IsPunct(r) {
			rs = append(rs, r)
		} else if unicode.IsSpace(r) {
			rs = append(rs, '-')
		}
	}
	return string(rs)
}
