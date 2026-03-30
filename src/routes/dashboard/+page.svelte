<script lang="ts">
	import { dropMangaBucket, dropMangaCollection, dropUsersCollection } from '$lib/db/helpers';
	import styles from './dashboard.module.scss';
</script>

<svelte:head>
	<title>Dashboard | Furiyomi</title>
</svelte:head>

<h1>Dashboard</h1>

<h3>This page is for testing purposes</h3>

<div class={styles.dashboard}>
	<h2>Database Actions</h2>
	<!-- TODO: fix this -->
	<button onclick={() => dropMangaCollection()}>Drop Manga Collection</button>
	<button onclick={() => dropUsersCollection()}>Drop Users Collection</button>
	<button onclick={() => dropMangaBucket()}>Drop Manga Bucket</button>
</div>
