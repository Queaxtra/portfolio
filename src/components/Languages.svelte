<script>
    let languages = [
        {
            language: "English",
            level: "Adequate Work",
        },
        {
            language: "Turkish",
            level: "Native",
        }
    ];
</script>

<div class="flex flex-col mt-6 md:mt-8 space-y-4 px-4 md:px-0">
    <h2 class="text-xl md:text-2xl font-semibold">Languages</h2>
    
    <div class="space-y-3 md:space-y-4">
        {#each languages as lang}
        <div class="flex flex-col space-y-1 bg-dark p-2 md:p-3 px-4 md:px-6 rounded hover:opacity-90 transition-all duration-300 border border-white/5">
            <h3 class="text-base md:text-lg font-medium text-accent-light">{lang.language}</h3>
            <span class="text-xs md:text-sm text-white/50">{lang.level}</span>
        </div>
        {/each}
    </div>
</div>