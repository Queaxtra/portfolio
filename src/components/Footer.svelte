<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import * as HoverCard from "$lib/components/ui/hover-card/index";
    import { useI18n } from "$lib/i18n";

    let time: string;
    let interval: ReturnType<typeof setInterval>;
    const { t } = useI18n();

    function updateTime() {
        time = new Intl.DateTimeFormat(navigator.language, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(new Date());
    }

    onMount(() => {
        updateTime();
        interval = setInterval(updateTime, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<footer class="w-full my-6">
    <div class="w-full max-w-6xl mx-auto">
        <div class="text-black/70 dark:text-white/70 text-sm flex">
            <span>© {new Date().getFullYear()} • Fatih Yılmaz</span>
            <HoverCard.Root>
                <HoverCard.Trigger class="ml-auto cursor-help">{time}</HoverCard.Trigger>
                <HoverCard.Content class="w-80">
                    <div class="space-y-4">
                        <div class="flex items-center space-x-3">
                            <span class="text-4xl">⏰</span>
                            <div>
                                <h4 class="text-sm font-semibold">{t("footer.time.title")}</h4>
                                <p class="text-xs text-muted-foreground">{t("footer.time.subtitle")}</p>
                            </div>
                        </div>
                        <p class="text-sm leading-relaxed">
                            {t("footer.time.description", { time })}
                        </p>
                        <div class="text-xs space-y-1 text-muted-foreground">
                            <p><span class="font-semibold">{t("footer.time.local")}</span> {time}</p>
                            <p><span class="font-semibold">{t("footer.time.spent")}</span> {t("footer.time.spentValue")}</p>
                        </div>
                        <p class="text-[10px] text-muted-foreground/50 italic">
                            {t("footer.time.note")}
                        </p>
                    </div>
                </HoverCard.Content>
            </HoverCard.Root>
        </div>
    </div>
</footer>
