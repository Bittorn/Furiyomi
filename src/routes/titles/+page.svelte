<script lang="ts">
	import styles from './titles.module.scss';
	import noCover from '$lib/assets/covers/no-cover.png';
	import MangaEntry from '$lib/components/MangaEntry.svelte';
	import { resolve } from '$app/paths';

	let { data } = $props();

	// svelte-ignore state_referenced_locally
	let { mangaList } = data;
</script>

<svelte:head>
	<title>Titles | Furiyomi</title>
</svelte:head>

<h1>Titles</h1>

<div class={styles.searchbar}>
	<div class={styles.searchicon}></div>
	<input type="text" id="searchBar" placeholder="Search manga..." />
</div>

{#if mangaList.length != 0}
	<div class={styles.mangalist}>
		{#each mangaList as manga (manga.id)}
			<MangaEntry
				mangaID={manga.id}
				mangaTitleEnglish={manga.title.english}
				mangaTitleNative={manga.title.native}
				mangaCoverPath={noCover}
			/>
			<MangaEntry
				mangaID={manga.id}
				mangaTitleEnglish={manga.title.english}
				mangaTitleNative={manga.title.native}
				mangaCoverPath={noCover}
			/>
			<MangaEntry
				mangaID={manga.id}
				mangaTitleEnglish={manga.title.english}
				mangaTitleNative={manga.title.native}
				mangaCoverPath={noCover}
			/>
			<MangaEntry
				mangaID={manga.id}
				mangaTitleEnglish={manga.title.english}
				mangaTitleNative={manga.title.native}
				mangaCoverPath={noCover}
			/>
			<MangaEntry
				mangaID={manga.id}
				mangaTitleEnglish={manga.title.english}
				mangaTitleNative={manga.title.native}
				mangaCoverPath={noCover}
			/>
			<MangaEntry
				mangaID={manga.id}
				mangaTitleEnglish={manga.title.english}
				mangaTitleNative={manga.title.native}
				mangaCoverPath={noCover}
			/>
		{/each}
	</div>
{:else}
	<h1>No manga available</h1>
	<h2><a href={resolve('/upload')}>Try uploading some!</a></h2>
{/if}
