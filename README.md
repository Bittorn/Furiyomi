# Furiyomi - Manga You Can Understand

*Furiyomi* is a manga platform for the discovery, tracking, and reading of manga that you can
actually understand. All manga on the platform has full furigana support, which you can
fine-tune to your individual skill level. In addition, you can easily toggle betweeen Japanese
and English versions of the text on-screen, so you can know that yes, <a
			href="https://mangadex.org/chapter/7f1b24f9-aaf0-4436-a479-c521d6b1d42b/1"
			target="_blank">they really did just say that.</a
		>

## 🚧 This app is currently in Pre-Alpha 🚧

Currently, you can read uploaded manga with support for looking up furigana via a popup
dictionary like Yomitan/Yomichan, or copy/paste to Google Translate/DeepL/etc.
**Furigana is not yet displayed.** This is because I am an actual brainlet and cannot understand
CSS for the life of me. Could I use AI? Yes, but I won't!

## Developing

Once dependencies have been installed with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Deploying with Docker

To build the Docker image, run the following command from the directory containing the Dockerfile:

```sh
docker build -t furiyomi .
```

Once the build is complete, you can run the app with:

```sh
docker run -p 3796:3796 furiyomi
```

The app can now be accessed by navigating to http://localhost:3796 in your web browser.
