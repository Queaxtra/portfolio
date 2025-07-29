<script lang="ts">
    import { onMount } from "svelte";
    import * as Card from "$lib/components/ui/card";

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

<section class="w-full my-8">
    <div class="w-full max-w-6xl mx-auto px-4 md:px-0">
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <h1 class="text-xl md:text-2xl font-bold">~/posts</h1>
                {#if posts.length > 5}
                    <a href="/posts" class="hover:underline">Sell All Posts</a>
                {/if}
            </div>

            {#if loading}
                <p class="opacity-50">Loading posts...</p>
            {:else if posts.length === 0}
                <p class="opacity-50">No posts available.</p>
            {:else}
                <div class="grid grid-cols-1 gap-4">
                    {#each posts.slice(0, 6) as post}
                        <Card.Root onclick={() => goto(`https://hackmd.io/@queaxtra/${post.id}`)} class="cursor-pointer">
                            <Card.Header>
                                <Card.Title>{post.title}</Card.Title>
                            </Card.Header>
                            <Card.Footer class="text-sm opacity-50">
                                {new Intl.DateTimeFormat().format(new Date(post.publishedAt))}
                            </Card.Footer>
                        </Card.Root>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</section>