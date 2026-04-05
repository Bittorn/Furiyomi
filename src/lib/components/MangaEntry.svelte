<script lang="ts">
	import styles from './MangaEntry.module.scss';
	import { resolve } from '$app/paths';
	import noCover from '$lib/assets/covers/no-cover.png';
	import type { Manga } from '$lib/db/mongo';

	interface MangaEntryInterface {
		manga: Manga;
		cover: string;
		[key: string]: unknown; // for all other properties
	}

	let { manga, cover, ...rest }: MangaEntryInterface = $props();
</script>

<div class={styles.manga} {...rest}>
	<h2>{manga.title.romaji}</h2>
	<h3>{manga.title.native}</h3>
	<img
		src={manga.cover || cover
			? cover
			: noCover}
		alt={manga.cover ? `${manga.title.romaji} Cover` : 'Manga Cover'}
		class={styles.cover}
	/><br />
	<a href={resolve('/titles/[mangaRef]', { mangaRef: manga.ref })}>View</a>
</div>
