<script lang="ts">
	import styles from './discover.module.scss';
	import lonelyGirlCover from '$lib/assets/covers/lonely-girl-ni-sakaraenai.jpeg';
</script>

<svelte:head>
	<title>Discover - Furiyomi</title>
</svelte:head>

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
		<img src={lonelyGirlCover} alt="Manga cover" class={styles.cover} /><br />
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href="discover/lonely-girl-ni-sakaraenai">View</a>
	</div>
</div>
