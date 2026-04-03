<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Manga, Volume } from '$lib/db/mongo';

	interface MangaEntryInterface {
		manga: Manga;
		volume: Volume;
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

<a
	href={resolve('/reader/[mangaRef]/[volume]', { mangaRef: manga.ref, volume: volume.title })}
	{...rest}>Read {volumeTitle}</a
>
