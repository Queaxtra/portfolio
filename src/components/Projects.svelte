<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { projects } from "$lib/utils/projects";

    const projectProfiles = [
        { label: "K9Crypt", href: "https://k9crypt.xyz/" },
        { label: "Pimatis", href: "https://github.com/pimatis" },
        { label: "Queaxtra", href: "https://github.com/Queaxtra" }
    ];

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

            {#if projects.length === 0}
                <p class="text-black/70 dark:text-white/70">No projects yet.</p>
            {/if}

            {#if projects.length > 0}
                <div class="grid grid-cols-1 gap-4">
                    {#each projects as project}
                        <Card.Root
                            class="cursor-pointer {project.href ? 'opacity-90' : ''}"
                            onclick={() => openUrl(project.href)}
                            role={project.href ? "link" : undefined}
                        >
                            <Card.Header>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Description class="text-black/70 dark:text-white/70">
                                    {project.description}
                                </Card.Description>
                            </Card.Header>
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
