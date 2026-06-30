package handlers

import (
	"fmt"
	"net/http"

	"github.com/Bittorn/Furiyomi/auth"
	"github.com/Bittorn/Furiyomi/db"
	"github.com/Bittorn/Furiyomi/pages"
	"github.com/gorilla/schema"
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

func Titles(w http.ResponseWriter, r *http.Request) {
	component := pages.Titles(prefersDarkMode(r), db.GetAllManga())
	component.Render(r.Context(), w)
}

func Upload(w http.ResponseWriter, r *http.Request) {
	component := pages.Upload(prefersDarkMode(r))
	component.Render(r.Context(), w)
}

func About(w http.ResponseWriter, r *http.Request) {
	component := pages.About(prefersDarkMode(r))
	component.Render(r.Context(), w)
}

func Dashboard(w http.ResponseWriter, r *http.Request) {
	component := pages.Dashboard(prefersDarkMode(r))
	component.Render(r.Context(), w)
}

func MangaDetail(w http.ResponseWriter, r *http.Request) {
	ref := r.PathValue("ref")

	manga, err := db.GetManga(ref)
	if err != nil {
		NotFound(w, r)
	} else {
		component := pages.MangaDetail(prefersDarkMode(r), manga)
		component.Render(r.Context(), w)
	}
}

func Login(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		component := pages.Login(prefersDarkMode(r))
		component.Render(r.Context(), w)
	case http.MethodPost:
		err := r.ParseForm()
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var loginForm auth.LoginForm

		dec := schema.NewDecoder()
		dec.IgnoreUnknownKeys(true)
		err = dec.Decode(&loginForm, r.PostForm)
		if err != nil {
			fmt.Printf("LOG %s - Failed to decode form: %s\n", r.RemoteAddr, err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// TODO protect against CSRF with gorilla/csrf middleware

		if auth.ShouldLogin(loginForm) {
			c := auth.NewSession()
			http.SetCookie(w, &c)
			http.Redirect(w, r, "/", http.StatusSeeOther)
		} else {
			http.Redirect(w, r, "/login", http.StatusSeeOther)
		}
	}
}

func Home(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/about", http.StatusSeeOther)
	// component := pages.Home(prefersDarkMode(r))
	// component.Render(r.Context(), w)
}
