<script lang="ts">
	import { enhance } from '$app/forms';

	import styles from './account.module.scss';
</script>

<svelte:head>
	<title>Account | Furiyomi</title>
</svelte:head>

<h1>Login</h1>

<h2>This page does nothing for now</h2>

<div class={styles.login}>
	<form method="post" use:enhance enctype="multipart/form-data">
		<div>
			<label for="username">Username:</label>
			<input type="text" id="username" name="username" required />
		</div>
		<br />
		<button type="submit">Log in</button>
	</form>
</div>
