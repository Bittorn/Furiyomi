<script lang="ts">
	import styles from './manga.module.scss';
	import noCover from '$lib/assets/covers/no-cover.png';
	import MangaVolumeLink from '$lib/components/MangaVolumeLink.svelte';
	import { resolve } from '$app/paths';

	let { data } = $props();

	// svelte-ignore state_referenced_locally
	let { manga } = data;
</script>

<svelte:head>
	<title>{manga.title.romaji} - Furiyomi</title>
</svelte:head>

<div class={styles.title}>
	<h1>{manga.title.romaji}</h1>
	<h2>{manga.title.native}</h2>
</div>

<div>
	<a href={resolve('/titles')} class={styles.back}>Back</a><br /><br /><br />

	<img
		src={manga.cover ? `/data/manga/${manga.ref}/${manga.volumes[0].title}/${manga.cover}` : noCover}
		alt="Manga cover"
		class={styles.solocover}
	/>

	<div class={styles.links}>
		<a href={manga.link} rel="external" target="_blank" class={styles.back}>View on AniList</a>
	</div>
</div>

<div class={styles.description}>
	<p>
		{manga.description}
	</p>
</div>

<br />

<div class={styles.volumes}>
	{#each manga.volumes as volume (volume.title)}
		<MangaVolumeLink manga={manga} volume={volume} />
	{/each}
</div>
