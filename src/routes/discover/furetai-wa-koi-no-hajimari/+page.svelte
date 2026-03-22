<!-- eslint-disable svelte/no-navigation-without-resolve -->
<script lang="ts">
	import styles from '../discover.module.scss';
	import cover from '$lib/assets/covers/furetai-wa-koi-no-hajimari.jpeg';
</script>

<svelte:head>
	<title>「触れたい」は恋の始まり - Furiyomi</title>
</svelte:head>

<div class={styles.title}>
	<h1>
		「<ruby>触<rt>ふ</rt></ruby>れたい」は<ruby>恋<rt>こい</rt></ruby>の<ruby>始<rt>はじ</rt></ruby
		>まり
	</h1>
	<h2>"I Want to Touch" is How Love Starts</h2>
</div>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a href="/discover" class={styles.back}>Back</a><br /><br /><br />

<img src={cover} alt="Manga cover" class={styles.solocover} />

<div class={styles.links}>
	<a href="https://anilist.co/manga/181754/Furetai-wa-Koi-no-Hajimari/" class={styles.back}
		>View on AniList</a
	>
</div>

<div class={styles.description}>
	<p>
		With her cool demeanor and refined looks, the well-read Kaede Minato is revered by her
		schoolmates. Momoko Hattori’s cute appearance made her a bit of an idol in the school right
		after enrollment. The two had virtually no interaction when Momoko’s chance encounter with Kaede
		promptly accelerates their relationship. A romantic tale on the brink of love.
		<i>(Source: Takeshobo, translated)</i>
	</p>
</div>

<br />

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<div class={styles.volumes} style="grid-template-columns: auto auto;">
	<a href="/mokuro/furetai-wa-koi-no-hajimari/1/vol1.html">Read volume 1</a>
	<a href="/mokuro/furetai-wa-koi-no-hajimari/2/vol2.html">Read volume 2</a>
</div>
