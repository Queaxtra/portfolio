<script>
    let skills = [
        { name: "HTML" },
        { name: "CSS" },
        { name: "JavaScript" },
        { name: "Typescript" },
        { name: "Svelte" },
        { name: "Next.js" },
        { name: "Node.js" },
        { name: "TailwindCSS" },
        { name: "Supabase" },
        { name: "Pocketbase" },
        { name: "Firebase" },
        { name: "MongoDB" }
    ];
</script>

<div class="flex flex-col mt-6 md:mt-8 space-y-4 px-4 md:px-0">
    <h2 class="text-xl md:text-2xl font-semibold">Skills</h2>
    
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        {#each skills as skill}
        <div class="bg-dark p-2 md:p-3 px-4 md:px-6 rounded hover:opacity-90 transition-all duration-300 border border-white/5">
            <span class="text-sm md:text-base text-accent-light">{skill.name}</span>
        </div>
        {/each}
    </div>
</div>