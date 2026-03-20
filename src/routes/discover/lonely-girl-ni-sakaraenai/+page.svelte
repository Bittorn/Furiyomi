<!-- eslint-disable svelte/no-navigation-without-resolve -->
<script lang="ts">
	import styles from './page.module.scss';
	import cover from '$lib/assets/covers/lonely-girl-ni-sakaraenai.jpeg';
</script>

<svelte:head>
	<title>Lonely Girl ni Sakaraenai - Furiyomi</title>
</svelte:head>

<h1>Lonely Girl ni Sakaraenai</h1>

<img src={cover} alt="Manga cover" class={styles.cover} />

<br />

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<p>
	<a href="$lib/mokuro/lonely-girl-ni-sakaraenai/1/vol1.html">Read volume 1</a><br />
	<a href="vol2.html">Read volume 2</a><br />
	<a href="vol3.html">Read volume 3</a><br />
	<a href="vol4.html">Read volume 4</a><br />
	<a href="vol5.html">Read volume 5</a><br />
	<a href="vol6.html">Read volume 6</a><br />
</p>
