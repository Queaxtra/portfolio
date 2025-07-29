<script>
    let links = [
        {
            href: "https://github.com/queaxtra",
            title: "Github"
        },
        {
            href: "https://x.com/queaxtra",
            title: "X"
        },
        {
            href: "https://www.linkedin.com/in/queaxtra",
            title: "LinkedIn"
        },
        {
            href: "https://www.instagram.com/queaxtra",
            title: "Instagram"
        },
        {
            href: "https://t.me/queaxtra",
            title: "Telegram"
        },
        {
            href: "mailto:fatih@etik.com",
            title: "Email"
        }
    ]
</script>

<section class="w-full my-8">
    <div class="w-full max-w-6xl mx-auto px-4 md:px-0">
        <div class="space-y-4">
            <h1 class="text-xl md:text-2xl font-bold">~/contact</h1>
            <div class="flex flex-wrap items-center">
                {#each links as link, i (link.href)}
                    <a href={link.href} class="opacity-50 hover:opacity-100">{link.title}</a>
                    {#if i !== links.length - 1}
                        <span class="mx-2 opacity-50">・</span>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</section>