package main

import (
	"fmt"
	"net/http"
)

// Code from https://medium.com/geekculture/learn-go-middlewares-by-examples-da5dc4a3b9aa

// logRequestMiddleware logs basic info of a HTTP request
// RemoteAddr: Network address that sent the request (IP:port)
// Proto: Protocol version
// Method: HTTP method
// URL: Request URL
func logRequestMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("LOG %s - %s %s %s\n", r.RemoteAddr, r.Proto, r.Method, r.URL)

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
		next.ServeHTTP(w, r)
	})
}

// secureHeadersMiddleware adds two basic security headers to each HTTP response
// X-XSS-Protection: 1; mode-block can help to prevent XSS attacks
// X-Frame-Options: deny can help to prevent clickjacking attacks
func secureHeadersMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-XSS-Protection", "1; mode-block")
		w.Header().Set("X-Frame-Options", "deny")

		next.ServeHTTP(w, r)
	})
}
