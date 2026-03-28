<script lang="ts">
	import styles from './manga.module.scss';
	import noCover from '$lib/assets/covers/no-cover.png';
	import MangaVolumeLink from '$lib/components/MangaVolumeLink.svelte';

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
	<!-- I DONT CARE !!! SHUT UP !!! -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_missing_attribute -->
	<a onclick={() => history.back()} class={styles.back}>Back</a><br /><br /><br />

	<img
		src={manga.cover ? `/data/manga/${manga.id}/${manga.volumes[0].title}/${manga.cover}` : noCover}
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
