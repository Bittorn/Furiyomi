<script lang="ts">
	import styles from './reader.module.scss';
	import Reader from '$lib/components/reader/Reader.svelte';
	import { betterPrintWarning } from '$lib/logs/logger';

	const sig = '/reader/[mangaRef]/[volume]';

	let { data } = $props();

	// svelte-ignore state_referenced_locally
	let { manga, mokuro, images } = data;

	if (mokuro.pages.length == 0) {
		betterPrintWarning('Mokuro has no pages', sig);
	}

	if (images.length == 0) {
		betterPrintWarning('Manga has no images', sig);
	}
</script>

<svelte:head>
	<title>{mokuro.volume} - {manga.title.romaji} | Furiyomi</title>
</svelte:head>

<div id={styles.body}>
	<Reader {mokuro} {images}/>
</div>
