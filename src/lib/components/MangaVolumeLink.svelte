<script lang="ts">
	import type { Manga, Volumes } from "$lib/db/helpers";

	interface MangaEntryInterface {
		manga: Manga;
		volume: Volumes;
		[key: string]: unknown; // for all other properties
	}

	let { manga, volume, ...rest }: MangaEntryInterface = $props();

	// svelte-ignore state_referenced_locally
	// svelte-ignore non_reactive_update
	let volumeTitle = volume.title;

	if (volumeTitle.startsWith('vol')) {
		volumeTitle = volumeTitle.replace('vol', 'volume ');
	}
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a href="/data/manga/{manga.id}/{volume.title}.html" {...rest}>Read {volumeTitle}</a>
