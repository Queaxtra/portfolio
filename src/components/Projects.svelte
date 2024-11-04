<script lang="ts">
    import { getProjects } from "../lib/projects";
    import { onMount } from "svelte";

    let projects: any[] = [];

    onMount(async () => {
        projects = await getProjects();
    })
</script>

<div class="flex flex-col mt-6 md:mt-8 space-y-4 px-4 md:px-0">
    <h2 class="text-xl md:text-2xl font-semibold">Projects</h2>
    
    <div class="space-y-3 md:space-y-4">
        {#each projects as project}
        <a href={project.html_url} target="_blank" rel="noopener noreferrer" class="block">
            <div class="flex flex-col space-y-1 md:space-y-2 bg-dark p-2 md:p-3 px-4 md:px-6 rounded hover:opacity-90 transition-all duration-300 border border-white/5">
                <h3 class="text-base md:text-lg font-medium text-accent-light break-words">{project.name || "No name"}</h3>
                <p class="text-sm md:text-base text-white/70">{project.description || "No description"}</p>
                <div class="flex flex-wrap gap-1.5 md:gap-2 mt-1 md:mt-2">
                    {#each project.topics as topic}
                    <span class="text-xs md:text-sm items-center text-white/50 bg-primary-light px-2 md:px-3 py-0.5 md:py-1 rounded bg-ligther">{topic}</span>
                    {/each}
                </div>
            </div>
        </a>
        {/each}
    </div>
</div>