package handlers

import (
	"net/http"

	"github.com/Bittorn/Furiyomi/pages"
)

func prefersDarkMode(r *http.Request) bool {
	cookie, err := r.Cookie("theme")
	if err == nil {
		if cookie.Value == "light" {
			return false
		}
	}
	return true
}

func NotFound(w http.ResponseWriter, r *http.Request) {
	component := pages.NotFound(prefersDarkMode(r))
	component.Render(r.Context(), w)
}

func About(w http.ResponseWriter, r *http.Request) {
	component := pages.About(prefersDarkMode(r))
	component.Render(r.Context(), w)
}

func Home(w http.ResponseWriter, r *http.Request) {
	component := pages.Home(prefersDarkMode(r))
	component.Render(r.Context(), w)
}
