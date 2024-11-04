<script>
    let year = new Date().getFullYear();
    let age = year - 2005;

    const socialLinks = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/queaxtra',
            icon: 'ri-linkedin-box-fill'
        },
        {
            name: 'GitHub',
            url: 'https://github.com/queaxtra',
            icon: 'ri-github-fill'
        },
        {
            name: 'X (Twitter)',
            url: 'https://x.com/queaxtra',
            icon: 'ri-twitter-x-fill'
        }
    ];
</script>

<div class="flex flex-col mt-8 md:mt-12 space-y-4 px-4 md:px-0">
    <div class="relative w-16 h-16 md:w-20 md:h-20">
        <img src="https://www.upload.ee/image/17273002/IMG_20230619_150930_703.jpg" alt="Profile" class="rounded-full border-2 border-dark w-full h-full object-cover" />
    </div>
    
    <div class="space-y-2">
        <h1 class="text-2xl md:text-3xl font-bold">Fatih Yılmaz</h1>
        <p class="font-light text-white/70">Front-end Developer</p>
        <p class="max-w-xl text-sm md:text-base text-white/50">As a {age} years old front-end developer based in Turkey, I lead UnoxDevs, a team dedicated to building exceptional web experiences.</p>
    </div>

    <div class="flex flex-wrap gap-4 mt-4">
        {#each socialLinks as link}
            <a href={link.url} target="_blank" class="flex items-center space-x-2 text-white/60 hover:text-white transition-all duration-300">
                <i class={link.icon + " text-lg"}></i>
                <span>{link.name}</span>
            </a>
        {/each}
    </div>
</div>