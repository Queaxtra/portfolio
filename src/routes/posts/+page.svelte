<script lang="ts">
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
    import { onMount } from "svelte";
    import * as Card from "$lib/components/ui/card";
    import Button from "$lib/components/ui/button/button.svelte";

    let posts: any[] = [];
    let loading = true;
    let currentPage = 1;
    const postsPerPage = 5;

    $: paginatedPosts = posts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

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

    function nextPage() {
        if (currentPage * postsPerPage < posts.length) {
            currentPage++;
        }
    }

    function previousPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }
</script>

<div class="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-[30rem]">
    <Navbar />

    <section class="w-full my-8">
        <div class="w-full max-w-6xl mx-auto px-4 md:px-0">
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <h1 class="text-xl md:text-2xl font-bold">~/all_posts</h1>
                </div>

                {#if loading}
                    <p class="opacity-50">Loading posts...</p>
                {:else if posts.length === 0}
                    <p class="opacity-50">No posts available.</p>
                {:else}
                    <div class="grid grid-cols-1 gap-4">
                        {#each paginatedPosts as post}
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
                    {#if posts.length > postsPerPage}
                        <div class="flex justify-between mt-4">
                            <Button onclick={previousPage} disabled={currentPage === 1}>Previous</Button>
                            <Button onclick={nextPage} disabled={currentPage * postsPerPage >= posts.length}>Next</Button>
                        </div>
                    {/if}
                {/if}
            </div>
        </div>
    </section>

    <Footer />
</div>