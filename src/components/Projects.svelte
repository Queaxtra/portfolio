<script lang="ts">
    import { onMount } from 'svelte';
    import { getProjects } from '../lib/projects';
    
    let projects: any[] = [];
    let isLoading = true;
    let hasError = false;
    let errorMessage = '';
    let currentProjectIndex = 0;
    
    function parseTopics(topics: any) {
        return topics || [];
    }
    
    async function loadProjects() {
        try {
            isLoading = true;
            hasError = false;
            
            const data = await getProjects();
            projects = data
                .filter((repo: { fork: any; description: any; }) => !repo.fork && repo.description)
                .map((repo: { name: any; description: any; language: any; topics: any; homepage: any; html_url: any; }) => ({
                    title: repo.name,
                    description: repo.description || "No description available",
                    language: repo.language,
                    tags: parseTopics(repo.topics),
                    demoLink: repo.homepage || repo.html_url,
                    repoLink: repo.html_url
                }))
                .slice(0, 3);
                
            if (projects.length === 0) {
                hasError = true;
                errorMessage = "No projects found";
            }
        } catch (error) {
            hasError = true;
            errorMessage = error.message || "Failed to load projects";
        } finally {
            isLoading = false;
        }
    }
    
    function nextProject() {
        if (projects.length > 0) {
            currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        }
    }
    
    function prevProject() {
        if (projects.length > 0) {
            currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        }
    }
    
    function goToProject(index: number) {
        currentProjectIndex = index;
    }

    onMount(() => {
        loadProjects();
    });
</script>

<div class="py-8 sm:py-12 md:py-16 px-4">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden relative min-h-[350px] sm:min-h-[400px] md:h-[450px] flex flex-col w-full">
            <div class="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4 flex justify-between items-center">
                <div class="items-center gap-2 sm:gap-4">
                    <h2 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Projects</h2>
                    <a href="https://github.com/Queaxtra?tab=repositories" target="_blank" rel="noopener noreferrer" class="text-xs sm:text-sm text-white/70 hover:text-white/90 transition-colors">View all projects <i class="ri-arrow-right-up-line"></i></a>
                </div>

                <!-- svelte-ignore a11y_consider_explicit_label -->
                {#if !isLoading && !hasError && projects.length > 1}
                    <div class="flex items-center gap-1 sm:gap-2 w-24 sm:w-32 justify-between">
                        <button class="bg-white/10 hover:bg-white/20 text-white/80 border border-white/10 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors" on:click={prevProject}>
                            <i class="ri-arrow-left-s-line text-xs sm:text-base"></i>
                        </button>
                        
                        <div class="flex gap-1 sm:gap-1.5 justify-center">
                            {#each projects as _, i}
                                <!-- svelte-ignore a11y_no_static_element_interactions -->
                                <!-- svelte-ignore a11y_click_events_have_key_events -->
                                <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full cursor-pointer transition-all duration-300 {i === currentProjectIndex ? 'bg-white/80 scale-125' : 'bg-white/20'}" on:click={() => goToProject(i)}></div>
                            {/each}
                        </div>
                        
                        <button class="bg-white/10 hover:bg-white/20 text-white/80 border border-white/10 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors" on:click={nextProject}>
                            <i class="ri-arrow-right-s-line text-xs sm:text-base"></i>
                        </button>
                    </div>
                {/if}
            </div>
            
            <div class="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 flex-grow overflow-y-auto flex flex-col justify-between">
                {#if isLoading}
                    <div class="flex items-center justify-center h-full">
                        <div class="text-white/70 text-sm sm:text-base">Loading projects...</div>
                    </div>
                {:else if hasError}
                    <div class="flex items-center justify-center h-full">
                        <div class="text-white/70 text-sm sm:text-base">{errorMessage}</div>
                    </div>
                {:else if projects.length === 0}
                    <div class="flex items-center justify-center h-full">
                        <div class="text-white/70 text-sm sm:text-base">No projects found</div>
                    </div>
                {:else}
                    <div class="h-full flex flex-col">
                        <div class="flex-grow">
                            <h3 class="text-lg sm:text-xl font-semibold text-white/90 mb-2 sm:mb-3">{projects[currentProjectIndex].title}</h3>
                            <p class="text-white/80 mb-4 sm:mb-6 text-xs sm:text-sm">{projects[currentProjectIndex].description}</p>
                            
                            {#if projects[currentProjectIndex].language}
                                <div class="mb-3 sm:mb-4">
                                    <h3 class="text-base sm:text-lg font-semibold text-white/90 mb-2 sm:mb-3">Primary Language</h3>
                                    
                                    <div class="flex items-center gap-2 sm:gap-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors p-2 sm:p-3 rounded-lg w-full md:w-auto">
                                        <div class="bg-white/10 border border-white/10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                                            <i class="ri-code-line text-white/80 text-sm sm:text-base"></i>
                                        </div>
                                        <span class="text-white/80 text-xs sm:text-sm">{projects[currentProjectIndex].language}</span>
                                    </div>
                                </div>
                            {/if}
                            
                            {#if projects[currentProjectIndex].tags && projects[currentProjectIndex].tags.length > 0}
                                <div class="mb-4 sm:mb-6">
                                    <h3 class="text-base sm:text-lg font-semibold text-white/90 mb-2 sm:mb-3">Technologies</h3>
                                    
                                    <div class="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                                        {#each projects[currentProjectIndex].tags as tag}
                                            <div class="flex items-center gap-2 sm:gap-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors p-2 sm:p-3 rounded-lg">
                                                <div class="bg-white/10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                                                    <i class="ri-hashtag text-white/80 text-sm sm:text-base"></i>
                                                </div>
                                                <span class="text-white/80 text-xs sm:text-sm">{tag}</span>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        </div>

                        <div class="flex flex-col gap-2 mt-auto py-5">
                            <a href={projects[currentProjectIndex].demoLink} target="_blank" rel="noopener noreferrer" class="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors">
                                {projects[currentProjectIndex].demoLink === projects[currentProjectIndex].repoLink ? 'View Project' : 'Live Demo'}
                            </a>
                            <a href={projects[currentProjectIndex].repoLink} target="_blank" rel="noopener noreferrer" class="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors">
                                Source Code
                            </a>
                        </div>
                    </div>
                {/if}
            </div>
            
            <div class="absolute -bottom-8 -right-8 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full bg-white/5 blur-xl opacity-50"></div>
            <div class="absolute -top-8 -left-8 w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 rounded-full bg-white/5 blur-xl opacity-50"></div>
        </div>
    </div>
</div>