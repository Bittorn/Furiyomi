<!-- eslint-disable svelte/no-navigation-without-resolve -->
<script lang="ts">
	import styles from '../discover.module.scss';
	import cover from '$lib/assets/covers/lonely-girl-ni-sakaraenai.jpeg';
</script>

<svelte:head>
	<title>ロンリーガールに逆らえない - Furiyomi</title>
</svelte:head>

<h1>
	ロンリーガールに<ruby>逆<rt>さか</rt></ruby>らえない
</h1>
<h2>I Can't Say No to the Lonely Girl</h2>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a href="/discover" class={styles.back}>Back</a><br /><br /><br />

<img src={cover} alt="Manga cover" class={styles.cover} />

<div class={styles.description}>
	<p>
		In this juicy yuri manga, the goody-goody high school girl Sakurai meets a lonely girl—and ends
		up entangled in a web of blackmail that might just lead to romance. It's hard to keep up with
		school when you can never say no to a devious classmate!
		<i>(Source: Kodansha USA)</i>
	</p>
</div>

<br />

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<div class={styles.volumes}>
	<a href="/mokuro/lonely-girl-ni-sakaraenai/1/vol1.html">Read volume 1</a>
	<a href="/mokuro/lonely-girl-ni-sakaraenai/1/vol2.html">Read volume 2</a>
	<a href="/mokuro/lonely-girl-ni-sakaraenai/1/vol3.html">Read volume 3</a>
	<a href="/mokuro/lonely-girl-ni-sakaraenai/1/vol4.html">Read volume 4</a>
	<a href="/mokuro/lonely-girl-ni-sakaraenai/1/vol5.html">Read volume 5</a>
	<a href="/mokuro/lonely-girl-ni-sakaraenai/1/vol6.html">Read volume 6</a>
</div>
