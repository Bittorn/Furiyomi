<script lang="ts">
	import styles from './manga.module.scss';
	import cover from '$lib/assets/covers/no-cover.png';
	import MangaVolumeLink from '$lib/components/MangaVolumeLink.svelte';

	let { data } = $props();

	// svelte-ignore state_referenced_locally
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let { id, title_romaji, title_native, title_english, link, description, volumes } = data;
</script>

<svelte:head>
	<title>{title_romaji} - Furiyomi</title>
</svelte:head>

<div class={styles.title}>
	<h1>{title_romaji}</h1>
	<h2>{title_native}</h2>
</div>

<div>
	<!-- I DONT CARE !!! SHUT UP !!! -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_missing_attribute -->
	<a onclick={() => history.back()} class={styles.back}>Back</a><br /><br /><br />

	<img src={cover} alt="Manga cover" class={styles.solocover} />

	<div class={styles.links}>
		<a href={link} rel="external" target="_blank" class={styles.back}>View on AniList</a>
	</div>
</div>

<div class={styles.description}>
	<p>
		{description}
	</p>
</div>

<br />

<div class={styles.volumes}>
	{#each volumes as volume (volume.title)}
		<MangaVolumeLink title={id} volume={volume.title} />
	{/each}
</div>
