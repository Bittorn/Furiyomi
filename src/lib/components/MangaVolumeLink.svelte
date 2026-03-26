<script lang="ts">
    interface MangaEntryInterface {
		title: string;
        volume: string;
		[key: string]: unknown; // for all other properties
	}

	let { title, volume, ...rest }: MangaEntryInterface = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a href='/data/manga/{title}/{volume}.html' {...rest}>Read {volume}</a>