<script lang="ts">
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import { onMount, onDestroy } from "svelte";
    import Navbar from "../../../components/Navbar.svelte";
    import Footer from "../../../components/Footer.svelte";
    import { Skeleton } from "$lib/components/ui/skeleton/index.js";
    import {
        type Post,
        type PostMeta,
        type RenderedBlock,
        type TocItem,
        calculateReadingTime,
        extractTableOfContents,
        processContentBlocks,
        fetchPost,
        fetchAdjacentPosts
    } from "$lib/utils/post";

    let post: Post | null = null;
    let loading = true;
    let error = false;
    let renderedBlocks: RenderedBlock[] = [];
    let copied = false;
    let imageLoadingStates: Record<string, boolean> = {};

    let readingTime = 0;
    let scrollProgress = 0;
    let tableOfContents: TocItem[] = [];
    let showScrollTop = false;
    let prevPost: PostMeta | null = null;
    let nextPost: PostMeta | null = null;
    let tocOpen = false;

    function scrollToHeading(id: string) {
        const element = document.getElementById(`heading-${id}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        tocOpen = false;
    }

    function handleScroll() {
        if (!browser) {
            return;
        }

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        showScrollTop = scrollTop > 400;
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function getPostUrl(): string {
        if (!browser) {
            return "";
        }
        return window.location.href;
    }

    function shareOnTwitter() {
        if (!post) {
            return;
        }
        const url = encodeURIComponent(getPostUrl());
        const text = encodeURIComponent(post.markdown);
        window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }

    function shareOnLinkedIn() {
        const url = encodeURIComponent(getPostUrl());
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    }

    async function copyLink() {
        await navigator.clipboard.writeText(getPostUrl());
        copied = true;
        setTimeout(() => {
            copied = false;
        }, 2000);
    }

    function handleImageLoad(id: string) {
        imageLoadingStates[id] = true;
        imageLoadingStates = { ...imageLoadingStates };
    }

    function setupCodeBlockCopy() {
        if (!browser) {
            return;
        }

        setTimeout(() => {
            const codeBlocks = document.querySelectorAll(".markdown-content pre");
            codeBlocks.forEach(block => {
                if (block.querySelector(".code-copy-btn")) {
                    return;
                }

                const wrapper = document.createElement("div");
                wrapper.className = "relative group";
                block.parentNode?.insertBefore(wrapper, block);
                wrapper.appendChild(block);

                const button = document.createElement("button");
                button.className = "code-copy-btn absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded bg-muted hover:bg-muted/80";
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256"><path fill="currentColor" d="M184 64H40a8 8 0 0 0-8 8v144a8 8 0 0 0 8 8h144a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8m-8 144H48V80h128Zm48-168v144a8 8 0 0 1-16 0V48H72a8 8 0 0 1 0-16h144a8 8 0 0 1 8 8"/></svg>`;
                button.title = "Copy code";

                button.addEventListener("click", async () => {
                    const code = block.querySelector("code")?.textContent ?? "";
                    await navigator.clipboard.writeText(code);
                    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256"><path fill="currentColor" d="m229.66 77.66l-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69L218.34 66.34a8 8 0 0 1 11.32 11.32"/></svg>`;
                    setTimeout(() => {
                        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256"><path fill="currentColor" d="M184 64H40a8 8 0 0 0-8 8v144a8 8 0 0 0 8 8h144a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8m-8 144H48V80h128Zm48-168v144a8 8 0 0 1-16 0V48H72a8 8 0 0 1 0-16h144a8 8 0 0 1 8 8"/></svg>`;
                    }, 2000);
                });

                wrapper.appendChild(button);
            });
        }, 100);
    }

    onMount(async () => {
        const id = $page.params.id;

        window.addEventListener("scroll", handleScroll);

        const data = await fetchPost(id);

        if (data) {
            post = data;
            readingTime = calculateReadingTime(data.content);
            tableOfContents = extractTableOfContents(data.content);
            renderedBlocks = await processContentBlocks(data.content, imageLoadingStates);
            const adjacent = await fetchAdjacentPosts(data.id);
            prevPost = adjacent.prev;
            nextPost = adjacent.next;
            setupCodeBlockCopy();
        }

        if (!data) {
            error = true;
        }

        loading = false;
    });

    onDestroy(() => {
        if (browser) {
            window.removeEventListener("scroll", handleScroll);
        }
    });

    $: pageTitle = post ? `${post.markdown} | Fatih Yılmaz` : "Blog Post | Fatih Yılmaz";
    $: pageDescription = post?.content?.[0]?.markdown?.slice(0, 160) ?? "Read this article by Fatih Yılmaz about web development and front-end technologies.";
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta name="author" content="Fatih Yılmaz" />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="/assets/logo.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
</svelte:head>

<div class="fixed top-0 left-0 w-full h-1 bg-muted z-50">
    <div
        class="h-full bg-primary transition-all duration-150"
        style="width: {scrollProgress}%"
    ></div>
</div>

<div class="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-120">
    <Navbar />

    <section class="w-full my-8">
        <div class="w-full max-w-4xl mx-auto px-4 md:px-0">
            {#if loading}
                <div class="space-y-4">
                    <Skeleton class="h-10 w-3/4" />
                    <Skeleton class="h-4 w-32" />
                    <Skeleton class="h-6 w-full" />
                    <Skeleton class="h-6 w-full" />
                    <Skeleton class="h-6 w-2/3" />
                </div>
            {:else if error}
                <p class="opacity-50">Post not found.</p>
            {:else if post}
                <article class="space-y-6">
                    <div class="space-y-3">
                        <h1 class="text-2xl md:text-4xl font-bold">{post.markdown}</h1>

                        <div class="flex items-center gap-4 text-sm opacity-50">
                            <span class="flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m64-88a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8V72a8 8 0 0 1 16 0v48h48a8 8 0 0 1 8 8"/></svg>
                                {readingTime} min read
                            </span>
                        </div>
                    </div>

                    {#if tableOfContents.length > 0}
                        <div class="border border-border rounded-lg">
                            <button
                                on:click={() => tocOpen = !tocOpen}
                                class="w-full flex items-center justify-between p-4 text-sm font-medium"
                            >
                                <span class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8M40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16m176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16"/></svg>
                                    Table of Contents
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 256 256"
                                    class="transition-transform"
                                    class:rotate-180={tocOpen}
                                >
                                    <path fill="currentColor" d="m213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32"/>
                                </svg>
                            </button>

                            {#if tocOpen}
                                <div class="px-4 pb-4 space-y-1">
                                    {#each tableOfContents as item}
                                        <button
                                            on:click={() => scrollToHeading(item.id)}
                                            class="block w-full text-left text-sm opacity-60 hover:opacity-100 transition-opacity py-1"
                                            class:pl-0={item.level === 2}
                                            class:pl-4={item.level === 3}
                                        >
                                            {item.text}
                                        </button>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    {/if}

                    <div class="markdown-content">
                        {#each renderedBlocks as block (block.id)}
                            {#if block.type === "html"}
                                {@html block.content}
                            {:else if block.type === "image"}
                                <div class="relative my-6">
                                    {#if !imageLoadingStates[block.id]}
                                        <Skeleton class="w-full h-64 rounded-lg" />
                                    {/if}
                                    <img
                                        src={block.url}
                                        alt={block.altText ?? ""}
                                        class="max-w-full h-auto rounded-lg transition-opacity duration-300"
                                        class:opacity-0={!imageLoadingStates[block.id]}
                                        class:opacity-100={imageLoadingStates[block.id]}
                                        on:load={() => handleImageLoad(block.id)}
                                    />
                                </div>
                            {/if}
                        {/each}
                    </div>

                    {#if prevPost || nextPost}
                        <div class="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4">
                            {#if prevPost}
                                <a
                                    href="/post/{prevPost.id}"
                                    data-sveltekit-reload
                                    class="group p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                                >
                                    <span class="text-xs opacity-50 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256"><path fill="currentColor" d="M224 128a8 8 0 0 1-8 8H59.31l58.35 58.34a8 8 0 0 1-11.32 11.32l-72-72a8 8 0 0 1 0-11.32l72-72a8 8 0 0 1 11.32 11.32L59.31 120H216a8 8 0 0 1 8 8"/></svg>
                                        Previous
                                    </span>
                                    <span class="block mt-1 text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                                        {prevPost.title}
                                    </span>
                                </a>
                            {:else}
                                <div></div>
                            {/if}

                            {#if nextPost}
                                <a
                                    href="/post/{nextPost.id}"
                                    data-sveltekit-reload
                                    class="group p-4 border border-border rounded-lg hover:border-primary/50 transition-colors text-right"
                                >
                                    <span class="text-xs opacity-50 flex items-center justify-end gap-1">
                                        Next
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256"><path fill="currentColor" d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32"/></svg>
                                    </span>
                                    <span class="block mt-1 text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                                        {nextPost.title}
                                    </span>
                                </a>
                            {:else}
                                <div></div>
                            {/if}
                        </div>
                    {/if}

                    <div class="mt-8 pt-4 border-t border-border flex items-center justify-between">
                        <a href="/posts" class="opacity-50 hover:opacity-100 text-sm">← Back to all posts</a>

                        <div class="flex items-center gap-3">
                            <button on:click={shareOnTwitter} class="opacity-50 hover:opacity-100" title="Share on X">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M214.75 211.71l-62.6-98.38l61.77-67.95a8 8 0 0 0-11.84-10.76l-58.84 64.72l-40.49-63.63A8 8 0 0 0 96 32H48a8 8 0 0 0-6.75 12.29l62.6 98.38l-61.77 68a8 8 0 1 0 11.84 10.76l58.84-64.72l40.49 63.63A8 8 0 0 0 160 224h48a8 8 0 0 0 6.75-12.29M164.39 208L62.57 48h29l101.86 160Z"/></svg>
                            </button>
                            <button on:click={shareOnLinkedIn} class="opacity-50 hover:opacity-100" title="Share on LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M216 24H40a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V40a16 16 0 0 0-16-16m0 192H40V40h176zM96 112v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0m88 28v36a8 8 0 0 1-16 0v-36a20 20 0 0 0-40 0v36a8 8 0 0 1-16 0v-64a8 8 0 0 1 15.79-1.78A36 36 0 0 1 184 140m-84-56a12 12 0 1 1-12-12a12 12 0 0 1 12 12"/></svg>
                            </button>
                            <button on:click={copyLink} class="opacity-50 hover:opacity-100" title="Copy link">
                                {#if copied}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="m229.66 77.66l-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69L218.34 66.34a8 8 0 0 1 11.32 11.32"/></svg>
                                {:else}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="currentColor" d="M240 88.23a54.43 54.43 0 0 1-16 37L189.25 160a54.27 54.27 0 0 1-38.63 16h-.05a54.63 54.63 0 0 1-38.62-16a8 8 0 0 1 11.32-11.32a38.65 38.65 0 0 0 54.66 0l34.68-34.67a38.59 38.59 0 0 0 0-54.66a38.65 38.65 0 0 0-54.66 0L139.56 78a8 8 0 0 1-11.31-11.31l18.38-18.39A54.86 54.86 0 0 1 185.25 32h.05A54.65 54.65 0 0 1 224 48a54.86 54.86 0 0 1 16 40.23M143.76 189.41l-18.39 18.38a38.65 38.65 0 0 1-54.66 0a38.59 38.59 0 0 1 0-54.66l34.68-34.67a38.65 38.65 0 0 1 54.66 0a8 8 0 0 0 11.32-11.32a54.63 54.63 0 0 0-38.62-16h-.05a54.27 54.27 0 0 0-38.63 16l-34.68 34.72a54.86 54.86 0 0 0-16 40.18a54.65 54.65 0 0 0 16.06 38.62a54.86 54.86 0 0 0 38.62 16.06h.05a54.65 54.65 0 0 0 38.57-16.06l18.39-18.38a8 8 0 0 0-11.32-11.32Z"/></svg>
                                {/if}
                            </button>
                        </div>
                    </div>
                </article>
            {/if}
        </div>
    </section>

    <Footer />
</div>

{#if showScrollTop}
    <button
        on:click={scrollToTop}
        class="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all z-40"
        title="Scroll to top"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="M208.49 152.49a12 12 0 0 1-17 0L128 89l-63.51 63.49a12 12 0 0 1-17-17l72-72a12 12 0 0 1 17 0l72 72a12 12 0 0 1 0 17"/></svg>
    </button>
{/if}
