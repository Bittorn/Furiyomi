## To-do list

[] Navbar subpath matches (/titles/blah should still match /titles)
[] templ components starting with lowercase letters are not private, they are scoped to the entire module
 - really stupid fix, prefix components with name of file (e.g. @css in about.templ becomes @about_css)

## Misc

- templUI - comonent library based on shadcn, makes use of AlpineJS
 - i HATE the install process, so maybe not do this
- sqlc w/ SQLite - no needless MongoDB container on production, can have everything as a single binary
 - need an additional container for Python anyway
- HTMX progressive enhancement - just build the damn thing then put htmx where needed
 - good for forms and replacing page content
 - check htmx-history and htmx-beforeswap
