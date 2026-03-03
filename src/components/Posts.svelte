<script lang="ts">
    import { onMount } from "svelte";
    import * as Card from "$lib/components/ui/card";
    import { Skeleton } from "$lib/components/ui/skeleton/index.js";
    import { fetchAllPosts, createPostUrl, type PostMeta } from "$lib/utils/post";

    let posts: PostMeta[] = [];
    let loading = true;

    onMount(async () => {
        const all = await fetchAllPosts();
        posts = all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        loading = false;
    });

    function goto(id: string, title: string) {
        window.location.href = createPostUrl(id, title);
    }
</script>

<section class="w-full">
    <div class="w-full max-w-6xl mx-auto py-6">
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <h1 class="text-xl md:text-2xl font-bold">~/posts</h1>
                {#if posts.length > 5}
                    <a href="/posts" class="hover:underline text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:transition-opacity text-sm flex items-center space-x-1">
                        <span>See All Posts</span>
                        <i class="ph ph-caret-right text-[15px]" aria-hidden="true"></i>
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
                        </Card.Root>
                    {/each}
                </div>
            {:else if posts.length === 0}
                <p class="text-black/70 dark:text-white/70">No posts available.</p>
            {:else}
                <div class="grid grid-cols-1 gap-4">
                    {#each posts.slice(0, 5) as post}
                        <Card.Root onclick={() => goto(post.id, post.title)} class="cursor-pointer">
                            <Card.Header>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Description class="text-black/70 dark:text-white/70">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Card.Description>
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
