<script lang="ts">
	interface MangaEntryInterface {
		title: string;
		volume: string;
		[key: string]: unknown; // for all other properties
	}

	let { title, volume, ...rest }: MangaEntryInterface = $props();

	// svelte-ignore state_referenced_locally
	// svelte-ignore non_reactive_update
	let volumeTitle = volume;

	if (volumeTitle.startsWith('vol')) {
		volumeTitle = volumeTitle.replace('vol', 'volume ');
	}
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a href="/data/manga/{title}/{volume}.html" {...rest}>Read {volumeTitle}</a>
