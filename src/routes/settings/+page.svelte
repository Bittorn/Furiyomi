<script lang='ts'>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import styles from './settings.module.scss';
</script>

<svelte:head>
    <title>Settings | Furiyomi</title>
</svelte:head>

<h1>Settings</h1>

<form onsubmit={console.log}>
    <h2>Show furigana for...</h2>
    <input type="radio" id="all" name="furigana" value="all" defaultChecked>
    <label for="all">All kanji</label><br>
    <input type="radio" id="n4" name="furigana" value="n4">
    <label for="n4">N4 kanji and higher</label><br>
    <input type="radio" id="n3" name="furigana" value="n3">
    <label for="n3">N3 kanji and higher</label><br>
    <input type="radio" id="n2" name="furigana" value="n2">
    <label for="n2">N2 kanji and higher</label><br>
    <input type="radio" id="n1" name="furigana" value="n1">
    <label for="n1">N1 kanji</label><br>
    <input type="radio" id="n1" name="furigana" value="none">
    <label for="n1">No furigana</label><br><br>
    <input type="submit" value="Save preferences">
</form> 
