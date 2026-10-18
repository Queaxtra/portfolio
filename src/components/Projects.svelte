<script lang="ts">
    import DashedBorder from "./DashedBorder.svelte";
    import * as Card from "$lib/components/ui/card";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import { Button } from "$lib/components/ui/button";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import { onMount } from "svelte";
    import { useI18n } from "$lib/i18n";

    type Project = {
        id: string;
        name: string;
        description: string;
        url?: string;
        paused?: boolean;
    };

    type ProjectList = {
        items: Project[];
        totalItems: number;
        totalPages: number;
        page: number;
        perPage: number;
    };

    let data = $state<ProjectList | null>(null);
    let error = $state<string>("");
    let loading = $state<boolean>(true);
    let page = $state<number>(1);

    const { t } = useI18n();

    async function loadProjects(nextPage: number) {
        loading = true;
        error = "";
        try {
            const res = await fetch(`/api/projects?page=${nextPage}&perPage=10`);
            if (!res.ok) throw new Error("projects could not be loaded");
            data = await res.json();
            page = data?.page ?? nextPage;
        } catch (e) {
            error = t("errors.projects");
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        loadProjects(1);
    });

    function openUrl(url: string | undefined) {
        if (url) {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    }

    const items = $derived(data?.items ?? []);
    const totalPages = $derived(data?.totalPages ?? 0);
</script>

<section class="w-full">
    <div class="w-full max-w-6xl mx-auto py-6">
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <h1 class="text-xl md:text-2xl font-bold leading-none">{t("projects.title")}</h1>
                    <Tooltip.Provider delayDuration={100}>
                        <Tooltip.Root>
                            <Tooltip.Trigger class="inline-flex items-center">
                                <i class="ph ph-info text-base text-black/60 dark:text-white/60" aria-hidden="true"></i>
                            </Tooltip.Trigger>
                            <Tooltip.Content>
                                <span>{t("projects.tooltip")}</span>
                            </Tooltip.Content>
                        </Tooltip.Root>
                    </Tooltip.Provider>
                </div>
                {#if totalPages > 1}
                    <div class="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled={page <= 1} onclick={() => loadProjects(page - 1)}>
                            <i class="ph ph-caret-left"></i>
                        </Button>
                        <span class="text-sm text-black/70 dark:text-white/70">{page} / {totalPages}</span>
                        <Button variant="outline" size="sm" disabled={page >= totalPages} onclick={() => loadProjects(page + 1)}>
                            <i class="ph ph-caret-right"></i>
                        </Button>
                    </div>
                {/if}
            </div>

            {#if loading}
                <div class="grid grid-cols-1 gap-4">
                    {#each Array(10) as _}
                        <Card.Root class="opacity-90">
                            <Card.Header>
                                <Skeleton class="h-5 w-40 mb-2" />
                                <Skeleton class="h-4 w-full" />
                                <Skeleton class="h-4 w-3/4 mt-1" />
                            </Card.Header>
                        </Card.Root>
                    {/each}
                </div>
            {:else if error}
                <p class="text-black/70 dark:text-white/70">{error}</p>
            {:else if items.length === 0}
                <p class="text-black/70 dark:text-white/70">{t("projects.empty")}</p>
            {:else}
                <div class="grid grid-cols-1 gap-4">
                    {#each items as project (project.id)}
                        <Card.Root
                            class="cursor-pointer relative overflow-hidden {project.url ? 'opacity-90' : ''} {project.paused ? 'bg-gradient-to-r from-amber-500/10 to-transparent' : ''}"
                            onclick={() => openUrl(project.url)}
                            role={project.url ? "link" : undefined}
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
                                    {project.name}
                                </Card.Title>
                                <div class="text-sm text-muted-foreground prose prose-sm dark:prose-invert max-w-none">
                                    {@html project.description}
                                </div>
                            </Card.Header>
                            {#if project.paused}
                                <Card.Footer class="relative z-10 pt-0">
                                    <p class="text-xs text-amber-500/60 flex items-center gap-1.5">
                                        <i class="ph ph-coffee"></i>
                                        {t("projects.paused")}
                                    </p>
                                </Card.Footer>
                            {/if}
                        </Card.Root>
                    {/each}
                </div>


            {/if}
        </div>
    </div>

    <DashedBorder />
</section>