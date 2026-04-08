<script lang="ts">
	import logo from '$lib/assets/favicon.svg';
	import styles from './about.module.scss';
</script>

<svelte:head>
	<title>About | Furiyomi</title>
</svelte:head>

<!-- svelte-ignore a11y_missing_content -->
<h1 class={styles.title}></h1>

<img src={logo} alt="Furiyomi logo" class={styles.logo} />

<h2>A manga platform designed for Japanese learners</h2>

<div class={styles.yapping}>
	<p>
		Furiyomi is a manga platform for the discovery, tracking, and reading of manga that you can
		actually understand. All manga on the platform has full furigana support, which you can
		fine-tune to your individual skill level. In addition, you can easily toggle between Japanese
		and English versions of the text on-screen, so you can know that yes, <a
			href="https://mangadex.org/chapter/7f1b24f9-aaf0-4436-a479-c521d6b1d42b/1"
			rel="external"
			target="_blank">they really did just say that.</a
		>
	</p>
</div>

<h1>🚧 We are currently in Alpha! 🚧</h1>

<img
	src="https://cdn.donmai.us/original/f6/23/__hatsuseno_alpha_yokohama_kaidashi_kikou_drawn_by_kona_ming__f6238c9fbe826157f9eec0bf6eae232d.jpg"
	alt="Hatsuseno Alpha"
	style="width: 400px; border-radius: 2rem"
/>
<h2>Hatsuseno Alpha <i>(Yokohama Kaidashi Kikou)</i></h2>
<h3>Art by <a href="https://www.youtube.com/@ksrvgn" target="_blank">ksrvgn</a></h3>

<h1>What does that mean?</h1>
<div class={styles.yapping}>
	<p>
		Currently, you can read uploaded manga with support for looking up furigana via a popup
		dictionary like Yomitan/Yomichan, or copy/paste to Google Translate/DeepL/etc.<br /><br />
		<b>Toggling English translations is currently not supported.</b> Progress tracking is also not
		implemented.<br />
		The reader also doesn't properly center your manga, due to my not understanding how to use CSS matrix().
	</p>
</div>

<div style="margin-top: 6rem;">
	<a href="https://noaiuse.org" target="_blank">
		<img
			src="https://noaiuse.org/download/no-ai-white-compact.svg"
			style="width: 20em; height: 20em;"
			alt="noaiuse.org graphic"
		/>
	</a>
</div>
