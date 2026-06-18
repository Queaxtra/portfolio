<script>
    import DashedBorder from "./DashedBorder.svelte";
    import { useI18n } from "$lib/i18n";

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
            href: "mailto:hi@fatih.live",
            title: "Email"
        }
    ]
    const { t } = useI18n();
</script>

<section class="w-full">
    <div class="w-full max-w-6xl mx-auto py-6">
        <div class="space-y-4">
            <h1 class="text-xl md:text-2xl font-bold">{t("contact.title")}</h1>
            <div class="flex flex-wrap items-center">
                {#each links as link, i (link.href)}
                    <a href={link.href} class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white">{link.title}</a>
                    {#if i !== links.length - 1}
                        <span class="mx-2 opacity-50">・</span>
                    {/if}
                {/each}
            </div>
        </div>
    </div>

    <DashedBorder />
</section>
