<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Badge } from "$lib/components/ui/badge";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import { projects } from "$lib/utils/projects";
    import { onMount } from "svelte";

    const projectProfiles = [
        { label: "K9Crypt", href: "https://k9crypt.xyz/" },
        { label: "Pimatis", href: "https://github.com/pimatis" },
        { label: "Queaxtra", href: "https://github.com/Queaxtra" }
    ];

    let loading = $state(true);

    onMount(() => {
        const timer = setTimeout(() => {
            loading = false;
        }, 1500);
        return () => clearTimeout(timer);
    });

    function openUrl(href: string | undefined) {
        if (href) {
            window.open(href, "_blank", "noopener,noreferrer");
        }
    }

    function openProfile(href: string) {
        window.open(href, "_blank", "noopener,noreferrer");
    }

    let dropdownOpen = $state(false);
</script>

<section class="w-full">
    <div class="w-full max-w-6xl mx-auto py-6">
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <h1 class="text-xl md:text-2xl font-bold">~/projects</h1>
                <DropdownMenu.Root bind:open={dropdownOpen}>
                    <DropdownMenu.Trigger class="hover:underline text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:transition-opacity text-sm flex items-center space-x-1 cursor-pointer bg-transparent border-none outline-none font-medium">
                        <span>See all Projects</span>
                        <i class="ph ph-caret-right inline-block text-[15px] transition-transform duration-200" style="transform: rotate({dropdownOpen ? 90 : 0}deg);" aria-hidden="true"></i>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content class="w-48" align="end">
                        <DropdownMenu.Group>
                            {#each projectProfiles as profile}
                                <DropdownMenu.Item onSelect={() => openProfile(profile.href)}>
                                    {profile.label}
                                </DropdownMenu.Item>
                            {/each}
                        </DropdownMenu.Group>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>

            {#if loading}
                <div class="grid grid-cols-1 gap-4">
                    {#each projects as project}
                        <Card.Root class="opacity-90">
                            <Card.Header>
                                <Skeleton class="h-5 w-40 mb-2" />
                                <Skeleton class="h-4 w-full" />
                                <Skeleton class="h-4 w-3/4 mt-1" />
                            </Card.Header>
                        </Card.Root>
                    {/each}
                </div>
            {:else if projects.length === 0}
                <p class="text-black/70 dark:text-white/70">No projects yet.</p>
            {:else}
                <div class="grid grid-cols-1 gap-4">
                    {#each projects as project}
                        <Card.Root
                            class="cursor-pointer relative overflow-hidden {project.href ? 'opacity-90' : ''} {project.paused ? 'bg-gradient-to-r from-amber-500/10 to-transparent' : ''}"
                            onclick={() => openUrl(project.href)}
                            role={project.href ? "link" : undefined}
                        >
                            {#if project.paused}
                                <div class="absolute inset-y-0 left-0 w-1/3 pointer-events-none z-0" aria-hidden="true">
                                    <div class="relative w-full h-full opacity-[0.08]">
                                        <i class="ph ph-pause-circle absolute text-amber-500 text-xl" style="left: 15%; top: 10%; transform: rotate(15deg);"></i>
                                        <i class="ph ph-coffee absolute text-amber-500 text-xl" style="left: 45%; top: 15%; transform: rotate(-25deg);"></i>
                                        <i class="ph ph-pause-circle absolute text-amber-500 text-xl" style="left: 25%; top: 45%; transform: rotate(45deg);"></i>
                                        <i class="ph ph-coffee absolute text-amber-500 text-xl" style="left: 55%; top: 50%; transform: rotate(-10deg);"></i>
                                        <i class="ph ph-pause-circle absolute text-amber-500 text-xl" style="left: 10%; top: 75%; transform: rotate(70deg);"></i>
                                        <i class="ph ph-coffee absolute text-amber-500 text-xl" style="left: 40%; top: 80%; transform: rotate(-45deg);"></i>
                                    </div>
                                </div>
                            {/if}
                            <Card.Header class="relative z-10">
                                <Card.Title class="flex items-center gap-2">
                                    {project.title}
                                </Card.Title>
                                <Card.Description>
                                    {project.description}
                                </Card.Description>
                            </Card.Header>
                            {#if project.paused}
                                <Card.Footer class="relative z-10 pt-0">
                                    <p class="text-xs text-amber-500/60 flex items-center gap-1.5">
                                        <i class="ph ph-coffee"></i>
                                        This project is taking a break
                                    </p>
                                </Card.Footer>
                            {/if}
                        </Card.Root>
                    {/each}
                </div>
            {/if}
        </div>
    </div>

    <section class="border-y border-border/50">
        <div class="h-1.5 w-full dashed-border"></div>
    </section>
</section>
