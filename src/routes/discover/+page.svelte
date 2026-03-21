<script lang="ts">
	import styles from './discover.module.scss';
	import lonelyGirlCover from '$lib/assets/covers/lonely-girl-ni-sakaraenai.jpeg';
	import whichIsLoveCover from '$lib/assets/covers/dore-ga-koi-ka-ga-wakaranai.jpg';
	import wantToTouchCover from '$lib/assets/covers/furetai-wa-koi-no-hajimari.jpeg';
</script>

<svelte:head>
	<title>Discover - Furiyomi</title>
</svelte:head>

<h1>Discover</h1>

<div class={styles.searchbar}>
	<div class={styles.searchicon}></div>
	<input type="text" id="searchBar" placeholder="Search manga..." />
</div>

<div class={styles.manga}>
	<div>
		<h2>
			どれが<ruby>恋<rt>こい</rt></ruby>かがわからない
		</h2>
		<h3>I Don’t Know Which is Love</h3>
		<img src={whichIsLoveCover} alt="Manga cover" class={styles.cover} /><br />
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href="discover/dore-ga-koi-ka-ga-wakaranai">View</a>
		<br /><br />
	</div>

	<div>
		<h2>
			「<ruby>触<rt>ふ</rt></ruby>れたい」は<ruby>恋<rt>こい</rt></ruby>の<ruby
				>始<rt>はじ</rt></ruby
			>まり
		</h2>
		<h3>"I Want to Touch" is How Love Starts</h3>
		<img src={wantToTouchCover} alt="Manga cover" class={styles.cover} /><br />
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href="discover/furetai-wa-koi-no-hajimari">View</a>
		<br /><br />
	</div>

	<div>
		<h2>
			ロンリーガールに<ruby>逆<rt>さか</rt></ruby>らえない
		</h2>
		<h3>I Can't Say No to the Lonely Girl</h3>
		<img src={lonelyGirlCover} alt="Manga cover" class={styles.cover} /><br />
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href="discover/lonely-girl-ni-sakaraenai">View</a>
		<br /><br />
	</div>
</div>
