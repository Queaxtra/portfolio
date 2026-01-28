<script lang="ts">
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
    import { onMount } from "svelte";
    import * as Card from "$lib/components/ui/card";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Skeleton } from "$lib/components/ui/skeleton/index.js";
    import { fetchAllPosts, type PostMeta } from "$lib/utils/post";

    const pageTitle = "Blog Posts | Fatih Yılmaz";
    const pageDescription = "Read articles about web development, front-end technologies, and creative coding by Fatih Yılmaz.";

    let posts: PostMeta[] = [];
    let loading = true;
    let currentPage = 1;
    const postsPerPage = 5;

    $: paginatedPosts = posts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    onMount(async () => {
        posts = await fetchAllPosts();
        loading = false;
    });

    function goto(id: string) {
        window.location.href = `/post/${id}`;
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

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta name="author" content="Fatih Yılmaz" />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/assets/logo.png" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
</svelte:head>

<div class="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-120">
    <Navbar />

    <section class="w-full my-8">
        <div class="w-full max-w-6xl mx-auto px-4 md:px-0">
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <h1 class="text-xl md:text-2xl font-bold">~/all_posts</h1>
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

                    <div class="flex justify-between mt-4">
                        <Skeleton class="h-10 w-32" />
                        <Skeleton class="h-10 w-32" />
                    </div>
                {:else if posts.length === 0}
                    <p class="opacity-50">No posts available.</p>
                {:else}
                    <div class="grid grid-cols-1 gap-4">
                        {#each paginatedPosts as post}
                            <Card.Root onclick={() => goto(post.id)} class="cursor-pointer">
                                <Card.Header>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Description class="opacity-50">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Card.Description>
                                </Card.Header>
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
