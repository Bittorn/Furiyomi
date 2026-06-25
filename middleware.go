package main

import (
	"log"
	"net/http"
)

// Code from https://medium.com/geekculture/learn-go-middlewares-by-examples-da5dc4a3b9aa

func logRequestMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %s [%s]\n", r.Method, r.URL, r.RemoteAddr)

		next.ServeHTTP(w, r)
	})
}

func checkAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Disabled while testing
		// cookie, err := r.Cookie("session_token")
		// if err == nil {
		// 	if auth.IsValidSession(cookie.Value) {
		// 		next.ServeHTTP(w, r)
		// 	} else {
		// 		fmt.Printf("LOG %s - Invalid token, redirecting\n", r.RemoteAddr)
		// 		http.Redirect(w, r, "/login", http.StatusFound) // might not be correct status code
		// 	}
		// }
		next.ServeHTTP(w, r) // REMOVE ON PROD
	})
}

func secureHeadersMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-XSS-Protection", "1; mode-block") // help prevent XSS attacks
		w.Header().Set("X-Frame-Options", "deny")           // help prevent clickjacking attacks

		next.ServeHTTP(w, r)
	})
}
