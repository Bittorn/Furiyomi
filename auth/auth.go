package auth

import (
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
)

type LoginForm struct {
	Username     string
	Password     string
	StayLoggedIn bool // not used currently
}

// REMOVE
const tempUser string = "user"
const tempPass string = "pass"

// REMOVE

var sessions map[string]time.Time = make(map[string]time.Time)

func IsValidSession(token string) bool {
	value, exists := sessions[token]
	if exists {
		if time.Now().Before(value) {
			return true
		} else {
			delete(sessions, token)
		}
	}
	return false
}

func ShouldLogin(loginForm LoginForm) bool {
	return loginForm.Username == tempUser && loginForm.Password == tempPass
}

func NewSession() http.Cookie {
	token := uuid.NewString()
	date := time.Now().Add(720 * time.Hour)
	cookie := http.Cookie{
		Name:     "session_token",
		Value:    token,
		Expires:  date,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	}
	fmt.Printf("LOG - Logging in user: %s - %s\n", token, date)
	sessions[token] = date
	return cookie
}
