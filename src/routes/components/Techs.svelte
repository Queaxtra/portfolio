<script lang="ts">
    let techs = [
        {
            name: "Svelte"
        },
        {
            name: "Tailwind CSS"
        },
        {
            name: "TypeScript"
        },
        {
            name: "Firebase"
        },
        {
            name: "Node.js"
        },
        {
            name: "Express"
        },
        {
            name: "MongoDB"
        },
        {
            name: "Next.js"
        },
        {
            name: "React"
        },
        {
            name: "Supabase"
        },
        {
            name: "HTML5"
        },
        {
            name: "CSS3"
        }
    ];
</script>

<div class="container mx-auto p-4 text-center">
    <div>
        <h1 class="relative mt-5 text-3xl font-semibold">Technologies I Use</h1>

        {#each techs as tech}
            <div class="mt-7 inline-block mx-5 bg-[#F5F5F5] p-2 px-5 rounded shadow-[5px_5px_0px_0px_#252525]">
                <p class="font-mono">{tech.name}</p>
            </div>
        {/each}
    </div>
</div>
