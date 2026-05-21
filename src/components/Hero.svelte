<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { HoverCard, HoverCardTrigger, HoverCardContent } from "$lib/components/ui/hover-card/index.js";
    import { Kbd } from "$lib/components/ui/kbd";

    let copied = $state(false);
    let modifier = $state("Ctrl");

    onMount(() => {
        if (browser) {
            modifier = navigator.platform.includes("Mac") ? "⌘" : "Ctrl";

            const handleKeydown = (e: KeyboardEvent) => {
                if (e.key === "m" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    window.location.href = "mailto:hi@fatih.live";
                }
            };

            window.addEventListener("keydown", handleKeydown);
            return () => window.removeEventListener("keydown", handleKeydown);
        }
    });

    async function copyEmail() {
        await navigator.clipboard.writeText("hi@fatih.live");
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 2000);
    }
</script>

<section class="w-full h-96 flex my-2">
    <div class="flex justify-center items-center w-full max-w-6xl mx-auto px-4">
        <div class="text-center space-y-4">
            <h1 class="text-4xl md:text-5xl font-bold">Cryptography Enthusiast, Software Developer</h1>
            <p class="text-lg opacity-80">A teammate who lives in Türkiye, develops projects on his own, is obsessed with cryptography, and is security-conscious.</p>

            <HoverCard openDelay={100} closeDelay={200}>
                <HoverCardTrigger>
                    <Button href="mailto:hi@fatih.live" class="cursor-pointer relative overflow-hidden group">
                        <span class="relative z-10">Contact Me</span>
                        <Kbd class="ml-2 text-xs hidden sm:inline-flex"><span class="text-[10px]">{modifier}</span>M</Kbd>
                        <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                    <div class="space-y-3">
                        <p class="text-sm dark:text-white/80 text-black/80">
                            I know, sometimes clicking a button feels too permanent. Hover here instead.
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            class="w-full"
                            onclick={copyEmail}
                        >
                            {#if copied}
                                <i class="ph ph-check"></i>
                                Copied!
                            {:else}
                                <i class="ph ph-copy"></i>
                                Copy hi@fatih.live
                            {/if}
                        </Button>
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    </div>
</section>
