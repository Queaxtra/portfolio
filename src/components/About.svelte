<script>
    let age = new Date().getFullYear() - 2005;
    import DashedBorder from "./DashedBorder.svelte";
    import * as HoverCard from "$lib/components/ui/hover-card/index";
    import { useI18n } from "$lib/i18n";

    const { t, getLocale } = useI18n();
</script>

{#snippet countryCard()}
    <HoverCard.Root>
        <HoverCard.Trigger class="text-black dark:text-white underline cursor-help">{t("about.country.inline")}</HoverCard.Trigger>
        <HoverCard.Content class="w-80">
            <div class="space-y-4">
                <div class="flex items-center space-x-4">
                    <span class="text-6xl">🇹🇷</span>
                    <div>
                        <h4 class="text-sm font-semibold">{t("about.country.name")}</h4>
                        <p class="text-sm text-muted-foreground">{t("about.country.localized")}</p>
                    </div>
                </div>
                <p class="text-sm leading-relaxed">
                    {t("about.country.description")}
                </p>
                <div class="text-xs space-y-1">
                    <p><span class="font-semibold">{t("about.country.coordinates")}</span> 38.9637° N, 35.2433° E</p>
                    <p><span class="font-semibold">{t("about.country.capital")}</span> {t("about.country.capitalValue")}</p>
                    <p><span class="font-semibold">{t("about.country.largestCity")}</span> {t("about.country.largestCityValue")}</p>
                </div>
            </div>
        </HoverCard.Content>
    </HoverCard.Root>
{/snippet}

<section class="w-full">
    <DashedBorder />

    <div class="w-full py-6">
        <div class="space-y-4">
            <h1 class="text-xl md:text-2xl font-bold">{t("about.title")}</h1>
            <p class="text-black/70 dark:text-white/70 leading-relaxed">
                {#if getLocale() === "tr"}
                    {@render countryCard()} {t("about.intro", { age })}
                {:else}
                    {t("about.intro", { age })} {@render countryCard()}
                {/if}

                {t("about.afterCountry")}

                <HoverCard.Root>
                    <HoverCard.Trigger class="text-black dark:text-white underline cursor-help"><a href="https://github.com/K9Crypt" class="hover:underline">@K9Crypt</a></HoverCard.Trigger>
                    <HoverCard.Content class="w-80">
                        <div class="space-y-4">
                            <div class="flex items-center space-x-4">
                                <img src="https://cdn.fatih.live/k9crypt-logo.png" alt="K9Crypt" class="w-16 h-16 rounded-lg" />
                                <div>
                                    <h4 class="text-sm font-semibold">K9Crypt</h4>
                                    <p class="text-sm text-muted-foreground">{t("about.k9crypt.category")}</p>
                                </div>
                            </div>
                            <p class="text-sm leading-relaxed">
                                {t("about.k9crypt.description")}
                            </p>
                            <div class="text-xs space-y-2">
                                <p><span class="font-semibold">{t("about.k9crypt.mission")}</span> {t("about.k9crypt.missionValue")}</p>
                                <p><span class="font-semibold">{t("about.k9crypt.features")}</span> {t("about.k9crypt.featuresValue")}</p>
                            </div>
                        </div>
                    </HoverCard.Content>
                </HoverCard.Root> {t("about.afterK9Crypt")}
            </p>
        </div>
    </div>
</section>
