<script lang="ts">
	import styles from './manga.module.scss';
	import cover from '$lib/assets/covers/no-cover.png';
	import { resolve } from '$app/paths';

	let { data } = $props();

	// svelte-ignore state_referenced_locally
	let { title_romaji, title_kana, title_en, anilist_link, description } = data;
</script>

<svelte:head>
	<title>{title_romaji} - Furiyomi</title>
</svelte:head>

<div class={styles.title}>
	<h1>{title_kana}</h1>
	<h2>{title_en}</h2>
</div>

<div>
	<!-- I DONT CARE !!! SHUT UP !!! -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_missing_attribute -->
	<a onclick={() => history.back()} class={styles.back}>Back</a><br /><br /><br />

	<img src={cover} alt="Manga cover" class={styles.solocover} />

	<div class={styles.links}>
		<a
			href={anilist_link}
			rel="external"
			target="_blank"
			class={styles.back}>View on AniList</a
		>
	</div>
</div>

<div class={styles.description}>
	<p>
		{description}
	</p>
</div>

<br />

<div class={styles.volumes}>
	<a href={resolve("/")}>Read volume 1</a>
	<a href={resolve("/")}>Read volume 2</a>
	<a href={resolve("/")}>Read volume 3</a>
	<a href={resolve("/")}>Read volume 4</a>
	<a href={resolve("/")}>Read volume 5</a>
	<a href={resolve("/")}>Read volume 6</a>
</div>
