<script>
    const socialLinks = [
        { name: "GitHub", icon: "ri-github-fill", url: "https://github.com/queaxtra" },
        { name: "Twitter", icon: "ri-twitter-x-fill", url: "https://x.com/queaxtra" },
        { name: "LinkedIn", icon: "ri-linkedin-fill", url: "https://www.linkedin.com/in/queaxtra" },
        { name: "Instagram", icon: "ri-instagram-fill", url: "https://www.instagram.com/queaxtra/" }
    ];
</script>

<div class="mt-8 sm:mt-12 md:mt-16 px-4">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden relative min-h-[350px] sm:min-h-[400px] md:h-[450px] flex flex-col w-full">
            <div class="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4">
                <h2 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Contact</h2>
            </div>
            
            <div class="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 flex-grow overflow-y-auto flex flex-col justify-between">
                <div class="h-full flex flex-col">
                    <div class="mb-4 sm:mb-6">
                        <p class="text-white/80 text-xs sm:text-sm"> Feel free to reach out if you have any questions, project ideas, or just want to connect. I'm always open to discussing new opportunities and collaborations.</p>
                    </div>
                    
                    <div class="mb-5 sm:mb-6">
                        <h3 class="text-base sm:text-lg font-semibold text-white/90 mb-2 sm:mb-3">Connect With Me</h3>
                        
                        <div class="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                            {#each socialLinks as link}
                                <a href={link.url} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 sm:gap-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors p-2 sm:p-3 rounded-lg">
                                    <div class="bg-white/10 border border-white/10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                                        <i class="{link.icon} text-white/80 text-sm sm:text-base"></i>
                                    </div>
                                    <span class="text-white/80 text-sm">{link.name}</span>
                                </a>
                            {/each}
                        </div>
                    </div>
                    
                    <div class="mt-auto py-5">
                        <a href="mailto:fatih@etik.com" class="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors">Send Mail</a>
                    </div>
                </div>
            </div>
            
            <div class="absolute -bottom-8 -right-8 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-white/5 blur-xl opacity-50"></div>
            <div class="absolute -top-8 -left-8 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-white/5 blur-xl opacity-50"></div>
        </div>
    </div>
</div>