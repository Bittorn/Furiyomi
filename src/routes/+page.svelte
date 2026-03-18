<svelte:head>
    <title>Home | Furiyomi</title>
</svelte:head>

<script lang="ts">
    import logo from "$lib/assets/favicon.svg"
    import styles from './index.module.scss';
</script>

<h1 class={styles.title}>
    <ruby>振<rt>ふ</rt></ruby>り<ruby>読<rt>よ</rt></ruby>み
</h1>

<img src={logo} alt="Furiyomi logo" class={styles.logo} />

<h2>A manga reader designed for Japanese learners</h2>
<p>
    🚧 This site is currently under construction 🚧<br>
    Cool stuff coming soon!
</p>
