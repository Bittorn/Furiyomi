<script lang='ts'>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import styles from './settings.module.scss';

    let form: HTMLFormElement;

    function updatePreferences(event: Event) {
        event.preventDefault();
        if (event.target && typeof window !== 'undefined') {
            // @ts-expect-error Furigana will show as not existing, but we know it does
            let furigana: string = event.target.furigana.value;
            console.log(furigana)
            localStorage.furigana = furigana;
        }
    }

    function init() {
        let furigana: string | null = localStorage.getItem("furigana");

        if (furigana) {
            console.log(furigana)
            form[furigana].checked = true;
        } else {
            localStorage.setItem("furigana", "all");
        }
    }
</script>

<svelte:head>
    <title>Settings | Furiyomi</title>
</svelte:head>

<svelte:window on:load={init}></svelte:window>

<h1>Settings</h1>

<form bind:this={form} method="post" onsubmit={updatePreferences}>
    <h2>Show furigana for...</h2>
    <input type="radio" id="all" name="furigana" value="all">
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
