# Furiyomi - Accessible Manga Reader

_Furiyomi_ is a manga platform for the discovery, tracking, and reading of manga that you can
actually understand. All manga on the platform has full furigana support, which you can
fine-tune to your individual skill level. In addition, you can easily toggle betweeen Japanese
and English versions of the text on-screen, so you can know that yes, <a
			href="https://mangadex.org/chapter/7f1b24f9-aaf0-4436-a479-c521d6b1d42b/1"
			target="_blank">they really did just say that.</a
		>

## 🚧 This app is currently in Alpha 🚧

<img
	src="https://cdn.donmai.us/original/f6/23/__hatsuseno_alpha_yokohama_kaidashi_kikou_drawn_by_kona_ming__f6238c9fbe826157f9eec0bf6eae232d.jpg"
	alt="Hatsuseno Alpha"
	style="width: 400px; border-radius: 2rem"
/>

Hatsuseno Alpha _(Yokohama Kaidashi Kikou)_

Art by <a href="https://www.youtube.com/@ksrvgn">ksrvgn</a>

Currently, you can read uploaded manga with support for looking up furigana via a popup
dictionary like Yomitan/Yomichan, or copy/paste to Google Translate/DeepL/etc.

Loading takes quite a while, as the images all get loaded synchronously and sent back to you in the
browser. **This is obnoxiously inefficient,** and is definitely a high-priority fix.

The reader also doesn't properly center your manga, due to my not understanding how to use CSS matrix(). Also on the list!

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

## Credits

<a href="https://noaiuse.org" target="_blank">
	<img
		src="https://noaiuse.org/download/no-ai-white-compact.svg"
		style="width: 20em; height: 20em;"
		alt="noaiuse.org graphic"
	/>
</a>
