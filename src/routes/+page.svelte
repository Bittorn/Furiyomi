<script lang="ts">
	import logo from '$lib/assets/favicon.svg';
	import styles from './index.module.scss';
</script>

<svelte:head>
	<title>Furiyomi - Manga You Can Understand</title>
</svelte:head>

<h1 class={styles.title}>
	<ruby>振<rt>ふ</rt></ruby>り<ruby>読<rt>よ</rt></ruby>み
</h1>

<img src={logo} alt="Furiyomi logo" class={styles.logo} />

<h2>A manga platform designed for Japanese learners</h2>
<h3>🚧 This site is currently under construction 🚧</h3>

<div class={styles.yapping}>
	<p>
		Furiyomi is a manga platform for the discovery, tracking, and reading of manga that you can
		actually understand. All manga on the platform has full furigana support, which you can
		fine-tune to your individual skill level. In addition, you can easily toggle betweeen Japanese
		and English versions of the text on-screen, so you can know 100% <a
			href="https://mangadex.org/chapter/7f1b24f9-aaf0-4436-a479-c521d6b1d42b/1"
			target="_blank">they really did just say that.</a
		>
	</p>
</div>
