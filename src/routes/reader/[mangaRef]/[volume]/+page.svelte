<script lang="ts">
	import styles from './reader.module.scss';
	import Reader from '$lib/components/reader/Reader.svelte';
	import type { Manga } from '$lib/db/helpers.js';
	import type { Mokuro } from '$lib/db/mokuro.js';
	import { betterPrintWarning } from '$lib/logs/logger.js';

	const sig = '/reader/[mangaRef]/[volume]';

	let { data } = $props();

	interface pInterface {
		manga: Manga,
		mokuro: Mokuro
	}

	// svelte-ignore state_referenced_locally
	let { manga, mokuro }: pInterface = data;

	if (mokuro.pages.length == 0) {
		betterPrintWarning('Mokuro has no pages', sig)
	}
</script>

<svelte:head>
	<title>{mokuro.volume} - {manga.title.romaji} | Furiyomi</title>
</svelte:head>

<div id={styles.body}>
	<Reader {mokuro}/>
</div>
