# Furiyomi - Accessible Manga Reader

_Furiyomi_ is a manga platform designed to make learning Japanese as naturally and frictionless as possible. 
All manga on the platform has full furigana support, which you can fine-tune to your individual skill level.
In addition, you can easily toggle betweeen Japanese and English versions of the text on-screen, so you can
know that yes, <a href="https://mangadex.org/chapter/7f1b24f9-aaf0-4436-a479-c521d6b1d42b/1" target="_blank">
they really did just say that.</a>

## 🚧 This app is currently in Alpha 🚧

<img
	src="https://cdn.donmai.us/original/f6/23/__hatsuseno_alpha_yokohama_kaidashi_kikou_drawn_by_kona_ming__f6238c9fbe826157f9eec0bf6eae232d.jpg"
	alt="Hatsuseno Alpha"
	style="width: 400px; border-radius: 2rem"
/>

Hatsuseno Alpha _(Yokohama Kaidashi Kikou)_

Art by <a href="https://www.youtube.com/@ksrvgn">ksrvgn</a>

We are currently transitioning from Svelte to Golang, and some features are not yet available.
Namely, actually reading manga is unavailable. The old Svelte version is currently available
via Docker, so you can read it properly there

On the Svelte version (prod), you can read uploaded manga with support for looking up furigana via a popup
dictionary like Yomitan/Yomichan, or copy/paste to Google Translate/DeepL/etc.

The reader doesn't properly center your manga, due to my not understanding how to use CSS matrix().
It is on the list!

## Developing

Once dependencies have been installed with `go mod install`, start a development server:

```sh
go tool air
```

## Deploying with Docker

To build the Docker image, run the following command from the directory containing the Dockerfile:

```sh
docker build -t furiyomi .
```

Once the build is complete, you can run the app with:

```sh
docker run -p -e DISABLE_DB=true 3000:3000 furiyomi
```

The DISABLE_DB flag stops the app from attempting to connect to a MongoDB instance.
If you have a MongoDB instance running with default settings, then turn this flag off.

The app can now be accessed by navigating to http://localhost:3000 in your web browser.
