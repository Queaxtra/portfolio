<script lang="ts">
    import { onMount } from "svelte";
    import * as Card from "$lib/components/ui/card";
    import { Skeleton } from "$lib/components/ui/skeleton/index.js";

    let posts: any[] = [];
    let loading = true;

    onMount(async () => {
        const response = await fetch("/api/posts/fetch/all");
        if (response.ok) {
            posts = await response.json();
        }

        loading = false;
    });

    function goto(url: string) {
        window.open(url, "_blank");
    }
</script>

<section class="w-full">
    <div class="w-full max-w-6xl mx-auto py-6">
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <h1 class="text-xl md:text-2xl font-bold">~/posts</h1>
                {#if posts.length > 5}
                    <a href="/posts" class="hover:underline opacity-20 hover:opacity-100 hover:transition-opacity text-sm flex items-center space-x-1">
                        <span>Sell All Posts</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"/></svg>
                    </a>
                {/if}
            </div>

            {#if loading}
                <div class="grid grid-cols-1 gap-4">
                    {#each Array(5) as _}
                        <Card.Root class="cursor-pointer">
                            <Card.Header>
                                <Skeleton class="h-6 w-full" />
                            </Card.Header>
                            <Card.Footer class="text-sm opacity-50">
                                <Skeleton class="h-4 w-24" />
                            </Card.Footer>
                        </Card.Root>
                    {/each}
                </div>
            {:else if posts.length === 0}
                <p class="opacity-50">No posts available.</p>
            {:else}
                <div class="grid grid-cols-1 gap-4">
                    {#each posts.slice(0, 5) as post}
                        <Card.Root onclick={() => goto(`https://hackmd.io/@queaxtra/${post.id}`)} class="cursor-pointer">
                            <Card.Header>
                                <Card.Title>{post.title}</Card.Title>
                            </Card.Header>
                            <Card.Footer class="text-sm opacity-50 flex justify-between">
                                <span>{new Intl.DateTimeFormat().format(new Date(post.publishedAt))}</span>
                                <span>{post.viewCount.toLocaleString()} views</span>
                            </Card.Footer>
                        </Card.Root>
                    {/each}
                </div>
            {/if}
        </div>
    </div>

    <!-- dashed border -->
    <section class="border-y border-border/50">
        <div class="h-1.5 w-full dashed-border"></div>
    </section>
</section>
