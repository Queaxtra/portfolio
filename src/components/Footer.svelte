<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import * as HoverCard from "$lib/components/ui/hover-card/index";

    let time: string;
    let interval: ReturnType<typeof setInterval>;

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
                                <h4 class="text-sm font-semibold">Time is an illusion</h4>
                                <p class="text-xs text-muted-foreground">Lunchtime doubly so.</p>
                            </div>
                        </div>
                        <p class="text-sm leading-relaxed">
                            You're staring at a clock on someone's portfolio. Think about that for a second. You could be outside. Touching grass. But no, you're here, watching <span class="font-mono">{time}</span> tick away.
                        </p>
                        <div class="text-xs space-y-1 text-muted-foreground">
                            <p><span class="font-semibold">Your local time:</span> {time}</p>
                            <p><span class="font-semibold">Time well spent?</span> Debatable.</p>
                        </div>
                        <p class="text-[10px] text-muted-foreground/50 italic">
                            Every second you spend here is a second you'll never get back. You're welcome.
                        </p>
                    </div>
                </HoverCard.Content>
            </HoverCard.Root>
        </div>
    </div>
</footer>