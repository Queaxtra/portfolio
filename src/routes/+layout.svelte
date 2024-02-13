<script>
    import "../app.pcss";
</script>

<slot />

<style>
    @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500&display=swap");
    :global(body) {
        background-color: #fafaf8;
        color: #252525;
    }

    h1 {
        font-family: "Outfit", sans-serif;
    }

    p {
        font-family: "Roboto Mono", monospace;
    }
</style>
