<script lang="ts">
    const frontendSkills = [
        "HTML", 
        "CSS", 
        "JavaScript", 
        "Svelte", 
        "React", 
        "TailwindCSS",
        "Next.js",
        "Vue",
        "Nuxt",
        "Astro"
    ];
    
    const specialInterests = [
        "Cryptography"
    ];
    
    const tools = [
        "Git", 
        "VS Code", 
        "Figma",
        "Notion",
        "Vercel",
        "Supabase",
        "Firebase",
        "MongoDB",
        "Pocketbase"
    ];
    
    const otherLanguages = [
        "TypeScript", 
        "Python", 
        "Node.js",
        "PHP"
    ];
    
    const cardGroups = [
        { title1: "Frontend", skills1: frontendSkills, title2: "Special Interests", skills2: specialInterests },
        { title1: "Tools & Workflow", skills1: tools, title2: "Other Languages", skills2: otherLanguages }
    ];
    
    let currentGroupIndex = 0;
    
    function nextGroup() {
        currentGroupIndex = (currentGroupIndex + 1) % cardGroups.length;
    }
    
    function prevGroup() {
        currentGroupIndex = (currentGroupIndex - 1 + cardGroups.length) % cardGroups.length;
    }
</script>

<div class="mt-8 sm:mt-12 md:mt-16 px-4">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden relative min-h-[350px] sm:min-h-[400px] md:h-[450px] flex flex-col w-full">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <div class="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4 flex justify-between items-center">
                <h2 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Skills</h2>
                <div class="flex items-center gap-1 sm:gap-2 w-24 sm:w-32 justify-between">
                    <button class="bg-white/10 hover:bg-white/20 text-white/80 border border-white/10 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors" on:click={prevGroup}>
                        <i class="ri-arrow-left-s-line text-xs sm:text-base"></i>
                    </button>
                    
                    <div class="flex gap-1 sm:gap-1.5 justify-center">
                        {#each cardGroups as _, i}
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full cursor-pointer transition-all duration-300 {i === currentGroupIndex ? 'bg-white/80 scale-125' : 'bg-white/20'}" on:click={() => { currentGroupIndex = i; }}></div>
                        {/each}
                    </div>
                    
                    <button class="bg-white/10 hover:bg-white/20 text-white/80 border border-white/10 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors" on:click={nextGroup}>
                        <i class="ri-arrow-right-s-line text-xs sm:text-base"></i>
                    </button>
                </div>
            </div>
            
            <div class="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 flex-grow overflow-hidden">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 h-full">
                    <div class="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
                        <h3 class="text-base sm:text-lg font-semibold text-white/90 mb-3 sm:mb-4">{cardGroups[currentGroupIndex].title1}</h3>
                        <div class="flex flex-wrap gap-1.5 sm:gap-2">
                            {#each cardGroups[currentGroupIndex].skills1 as skill, i}
                                <span class="bg-white/10 text-white/80 border border-white/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">{skill}</span>
                            {/each}
                        </div>
                    </div>
                    
                    <div class="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 mt-3 md:mt-0">
                        <h3 class="text-base sm:text-lg font-semibold text-white/90 mb-3 sm:mb-4">{cardGroups[currentGroupIndex].title2}</h3>
                        <div class="flex flex-wrap gap-1.5 sm:gap-2">
                            {#each cardGroups[currentGroupIndex].skills2 as skill, i}
                                <span class="bg-white/10 text-white/80 border border-white/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">{skill}</span>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="absolute -bottom-8 -right-8 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full bg-white/5 blur-xl opacity-50"></div>
            <div class="absolute -top-8 -left-8 w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 rounded-full bg-white/5 blur-xl opacity-50"></div>
        </div>
    </div>
</div>