<script lang="ts">
	import styles from './MangaEntry.module.scss';
	import { resolve } from '$app/paths';

    interface MangaEntryInterface {
		mangaID: string;
        mangaTitleRomaji: string;
        mangaTitleNative: string;
        mangaCoverPath: string;
		[key: string]: unknown; // for all other properties
	}

	let { mangaID, mangaTitleRomaji, mangaTitleNative, mangaCoverPath, ...rest }: MangaEntryInterface = $props();
</script>

<div class={styles.manga} {...rest}>
	<h2>{mangaTitleRomaji}</h2>
	<h3>{mangaTitleNative}</h3>
	<img src={mangaCoverPath} alt="Manga cover" class={styles.cover} /><br />
	<a href={resolve('/titles/[mangaID]', { mangaID })}
		>View</a
	>
</div>
