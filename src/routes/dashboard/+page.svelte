<script lang="ts">
	import styles from './dashboard.module.scss';
	import {
		dropDatabaseRemote,
		dropMangaBucketRemote,
		dropMangaCollectionRemote,
		dropUsersCollectionRemote
	} from './dashboard.remote';
</script>

<svelte:head>
	<title>Dashboard | Furiyomi</title>
</svelte:head>

<h1>Dashboard</h1>

<p><i>(This page is for testing purposes)</i></p>

<div class={styles.dashboard}>
	<h2>Database Actions</h2>
	<button
		class={styles.dropDatabase}
		onclick={async () => {
			try {
				await dropDatabaseRemote();
			} catch (error) {
				alert(`Something went wrong: ${error}`);
			}
		}}>Drop Database</button
	>
	<button
		onclick={async () => {
			try {
				await dropMangaCollectionRemote();
			} catch (error) {
				alert(`Something went wrong: ${error}`);
			}
		}}>Drop Manga Collection</button
	>
	<button
		onclick={async () => {
			try {
				await dropUsersCollectionRemote();
			} catch (error) {
				alert(`Something went wrong: ${error}`);
			}
		}}>Drop Users Collection</button
	>
	<button
		onclick={async () => {
			try {
				await dropMangaBucketRemote();
			} catch (error) {
				alert(`Something went wrong: ${error}`);
			}
		}}>Drop Manga Bucket</button
	>
</div>
