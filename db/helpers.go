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
	for _, file := range filesToIgnore {
		if strings.Contains(name, file) {
			log.Printf("File '%s' matches ignore rule '%s'\n", name, file)
			return true
		}
	}
	return false
}

func IsMokuro(name string) bool {
	if strings.HasSuffix(name, ".mokuro") {
		log.Printf("File '%s' is mokuro file\n", name)
		return true
	} else {
		return false
	}
}

func GenerateRef(name string) string {
	// TODO does this even work?
	name = strings.ToLower(name)
	rs := make([]rune, 0, len(name))
	for _, r := range name {
		if unicode.IsSpace(r) {
			rs = append(rs, '-')
		} else if r <= 127 && !unicode.IsPunct(r) {
			rs = append(rs, r)
		}
	}
	return string(rs)
}
