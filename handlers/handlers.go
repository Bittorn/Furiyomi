package handlers

import (
	"net/http"

	"github.com/Bittorn/Furiyomi/components"
)

func Page(w http.ResponseWriter, r *http.Request) {
	component := components.Home("Dev")
	component.Render(r.Context(), w)
}
