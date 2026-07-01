## To-do list

- [ ] Navbar subpath matches (/titles/blah should still match /titles)
- [ ] templ components starting with lowercase letters are not private, they are scoped to the entire module
- [ ] switch to env package for loading config
- [ ] fix GODEBUG=multipartmaxparts=50000,multipartmaxheaders=100000 since this is really bad
- [ ] db/files.go: what happens when no file is found
- [ ] reader: cuts off sides for some reason, might be @Base in place of @BaseNoNav

## Misc

- templUI - comonent library based on shadcn, makes use of AlpineJS
    - i HATE the install process, so maybe not do this
- sqlc w/ SQLite - no needless MongoDB container on production, can have everything as a single binary
    - need an additional container for Python anyway
- HTMX progressive enhancement - just build the damn thing then put htmx where needed
    - good for forms and replacing page content
    - check htmx-history and htmx-beforeswap
- [alice](https://github.com/justinas/alice) for better middleware management
    - has not been updated in 2 years - does it need to be?
    - not needed ATM
