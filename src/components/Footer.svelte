<script>
    const currentYear = new Date().getFullYear();
</script>

<footer class="mt-8 sm:mt-12 md:mt-16 my-5 px-4">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden relative w-full">
            <div class="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                <div>
                    <img 
                        src="https://www.upload.ee/image/17709275/queaxtra-logo.png" 
                        alt="Logo" 
                        class="h-8 sm:h-10 md:h-12"
                    >
                </div>
                
                <div class="flex flex-col gap-0.5 sm:gap-1 items-start md:items-end mt-1 md:mt-0">
                    <span class="text-white/80 text-sm sm:text-base font-medium">Fatih Yılmaz</span>
                    <p class="text-white/50 text-xs sm:text-sm">© {currentYear} All rights reserved</p>
                </div>
            </div>

            <div class="absolute -bottom-8 -right-8 w-20 sm:w-28 md:w-32 h-20 sm:h-28 md:h-32 rounded-full bg-white/5 blur-xl opacity-50"></div>
            <div class="absolute -top-8 -left-8 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 rounded-full bg-white/5 blur-xl opacity-50"></div>
        </div>
    </div>
</footer>