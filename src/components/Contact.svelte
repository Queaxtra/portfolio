<script>
    let contactInfo = [
        {
            type: "Email",
            value: "queaxtra@proton.me",
            href: "mailto:queaxtra@proton.me"
        },
        {
            type: "X (Twitter)",
            value: "@queaxtra",
            href: "https://x.com/queaxtra"
        },
        {
            type: "LinkedIn",
            value: "in/queaxtra",
            href: "https://www.linkedin.com/in/queaxtra"
        },
        {
            type: "Instagram",
            value: "@queaxtra",
            href: "https://instagram.com/queaxtra"
        }
    ];
</script>

<div class="flex flex-col mt-6 md:mt-8 space-y-4 px-4 md:px-0">
    <h2 class="text-xl md:text-2xl font-semibold">Contact Information</h2>
    
    <div class="space-y-3 md:space-y-4">
        {#each contactInfo as contact}
        <a href={contact.href} class="flex items-center space-x-3 bg-dark p-2 md:p-3 px-4 md:px-6 rounded hover:opacity-90 transition-all duration-300 border border-white/5">
            <div class="flex flex-col">
                <span class="text-sm text-white/50">{contact.type}</span>
                <span class="text-base md:text-lg text-accent-light">{contact.value}</span>
            </div>
        </a>
        {/each}
    </div>
</div>