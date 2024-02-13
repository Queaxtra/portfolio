<script lang="ts">
    import Footer from "../components/Footer.svelte"
    import { onMount } from "svelte";
    let url = "https://api.github.com/users/Queaxtra/repos";
    let projects: any[] = [];

    onMount(async () => {
        const res = await fetch(url);
        const data = await res.json();
        projects = data;
    });
</script>

<div class="container mx-auto p-4 text-center">
    <h1 class="relative mt-5 text-3xl font-semibold">All Projects</h1>
    <p class="text-sm font-mono mt-5">There are <b>{projects.length}</b> projects in total.</p>
    <div>
        {#if projects.length === 0}
            <p class="mt-5">Loading...</p>
        {:else}
            {#each projects as project}
                <div class="mt-7 inline-block mx-5 bg-[#F5F5F5] p-2 px-5 rounded shadow-[5px_5px_0px_0px_#252525]">
                    <a href={project.html_url} class="float-right"><i class="fab fa-github"></i></a>
                    <a href={project.html_url} class="font-semibold">
                        {project.name}
                    </a>

                    <div class="mt-2">
                        <span class="text-xs bg-[#F5F5F5] text-[#666666] font-mono">Language: {project.language || "Unknown"}</span>
                        <span class="text-xs bg-[#F5F5F5] text-[#666666] font-mono ml-2">Stars: {project.stargazers_count}</span>
                        <span class="text-xs bg-[#F5F5F5] text-[#666666] font-mono ml-2">Forks: {project.forks_count}</span>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
    <div class="mt-10">
        <a href="/" class="font-mono text-sm">Go back to home</a>
    </div>
</div>

<Footer />
