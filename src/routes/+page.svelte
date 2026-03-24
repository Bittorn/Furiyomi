<script lang="ts">
	import styles from './index.module.scss';
	import cover from '$lib/assets/covers/no-cover.png';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Furiyomi</title>
</svelte:head>

<h1>Library</h1>

<div class={styles.searchbar}>
	<div class={styles.searchicon}></div>
	<input type="text" id="searchBar" placeholder="Search manga..." />
</div>

<div class={styles.manga}>
	<div>
		<h2>
			ロンリーガールに<ruby>逆<rt>さか</rt></ruby>らえない
		</h2>
		<h3>I Can't Say No to the Lonely Girl</h3>
		<img src={cover} alt="Manga cover" class={styles.cover} /><br />
		<a href={resolve('/titles/[mangaTitle]', { mangaTitle: 'lonely-girl-ni-sakaraenai' })}>View</a>
	</div>

	<div>
		<h2>
			ロンリーガールに<ruby>逆<rt>さか</rt></ruby>らえない
		</h2>
		<h3>I Can't Say No to the Lonely Girl</h3>
		<img src={cover} alt="Manga cover" class={styles.cover} /><br />
		<a href={resolve('/titles/[mangaTitle]', { mangaTitle: 'lonely-girl-ni-sakaraenai' })}>View</a>
	</div>

	<div>
		<h2>
			ロンリーガールに<ruby>逆<rt>さか</rt></ruby>らえない
		</h2>
		<h3>I Can't Say No to the Lonely Girl</h3>
		<img src={cover} alt="Manga cover" class={styles.cover} /><br />
		<a href={resolve('/titles/[mangaTitle]', { mangaTitle: 'lonely-girl-ni-sakaraenai' })}>View</a>
	</div>

	<div>
		<h2>
			ロンリーガールに<ruby>逆<rt>さか</rt></ruby>らえない
		</h2>
		<h3>I Can't Say No to the Lonely Girl</h3>
		<img src={cover} alt="Manga cover" class={styles.cover} /><br />
		<a href={resolve('/titles/[mangaTitle]', { mangaTitle: 'lonely-girl-ni-sakaraenai' })}>View</a>
	</div>
</div>
