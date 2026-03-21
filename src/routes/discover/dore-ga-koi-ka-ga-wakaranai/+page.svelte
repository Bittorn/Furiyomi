<!-- eslint-disable svelte/no-navigation-without-resolve -->
<script lang="ts">
	import styles from '../discover.module.scss';
	import cover from '$lib/assets/covers/dore-ga-koi-ka-ga-wakaranai.jpg';
</script>

<svelte:head>
	<title>どれが恋かがわからない - Furiyomi</title>
</svelte:head>

<h1>
	どれが<ruby>恋<rt>こい</rt></ruby>かがわからない
</h1>
<h2>I Don’t Know Which is Love</h2>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a href="/discover" class={styles.back}>Back</a><br /><br /><br />

<img src={cover} alt="Manga cover" class={styles.solocover} />

<div class={styles.links}>
	<a href="https://anilist.co/manga/137303/Dore-ga-Koi-ka-ga-Wakaranai/" class={styles.back}
		>View on AniList</a
	>
</div>

<div class={styles.description}>
	<p>
		Mei Soraike tries to confess her love to the best friend she has harbored a secret crush
		for…only to have her hopes crushed. But a little heartbreak is fine—because she’ll absolutely,
		definitely get a girlfriend in college!
		<i>(Source: Yen Press)</i>
	</p>
</div>

<br />

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<div class={styles.volumes}>
	<a href="/mokuro/dore-ga-koi-ka-ga-wakaranai/1/vol1.html">Read volume 1</a>
	<a href="/mokuro/dore-ga-koi-ka-ga-wakaranai/2/vol2.html">Read volume 2</a>
	<a href="/mokuro/dore-ga-koi-ka-ga-wakaranai/3/vol3.html">Read volume 3</a>
	<a href="/mokuro/dore-ga-koi-ka-ga-wakaranai/4/vol4.html">Read volume 4</a>
	<a href="/mokuro/dore-ga-koi-ka-ga-wakaranai/5/vol5.html">Read volume 5</a>
	<a href="/mokuro/dore-ga-koi-ka-ga-wakaranai/6/vol6.html">Read volume 6</a>
</div>
