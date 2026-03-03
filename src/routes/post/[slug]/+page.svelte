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
        fetchAdjacentPosts,
        extractIdFromSlug,
        generateSlug,
        createPostUrl
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
    let activeHeadingId = "";
    let showStickyToc = false;
    let tocElement: HTMLElement | null = null;
    let mobileTocOpen = false;
    let linkCopiedId = "";
    let expandedPages: Record<string, boolean> = {};

    function togglePage(id: string) {
        expandedPages[id] = !expandedPages[id];
        expandedPages = { ...expandedPages };
    }

    $: if (browser) {
        document.body.style.overflow = mobileTocOpen ? "hidden" : "";
    }

    function scrollToHeading(id: string) {
        const element = document.getElementById(`heading-${id}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        tocOpen = false;
        mobileTocOpen = false;
    }

    async function copyHeadingLink(id: string) {
        const url = `${window.location.origin}${window.location.pathname}#heading-${id}`;
        await navigator.clipboard.writeText(url);
        linkCopiedId = id;
        setTimeout(() => {
            linkCopiedId = "";
        }, 2000);
    }

    function checkHashAndScroll() {
        if (!browser) {
            return;
        }

        const hash = window.location.hash;
        if (hash && hash.startsWith("#heading-")) {
            setTimeout(() => {
                const element = document.getElementById(hash.slice(1));
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 300);
        }
    }

    function handleScroll() {
        if (!browser) {
            return;
        }

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        showScrollTop = scrollTop > 400;

        if (tocElement) {
            const tocRect = tocElement.getBoundingClientRect();
            showStickyToc = tocRect.bottom < 0;
        }

        updateActiveHeading();
    }

    function updateActiveHeading() {
        if (tableOfContents.length === 0) {
            return;
        }

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const isAtBottom = docHeight > 0 && scrollTop >= docHeight - 50;

        if (isAtBottom) {
            activeHeadingId = tableOfContents[tableOfContents.length - 1].id;
            return;
        }

        let currentActive = "";
        for (const item of tableOfContents) {
            const element = document.getElementById(`heading-${item.id}`);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100) {
                    currentActive = item.id;
                }
            }
        }

        if (currentActive) {
            activeHeadingId = currentActive;
        }
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
                button.innerHTML = `<i class="ph ph-copy" style="font-size:14px"></i>`;
                button.title = "Copy code";

                button.addEventListener("click", async () => {
                    const code = block.querySelector("code")?.textContent ?? "";
                    await navigator.clipboard.writeText(code);
                    button.innerHTML = `<i class="ph ph-check" style="font-size:14px"></i>`;
                    setTimeout(() => {
                        button.innerHTML = `<i class="ph ph-copy" style="font-size:14px"></i>`;
                    }, 2000);
                });

                wrapper.appendChild(button);
            });

            setupHeadingLinks();
        }, 100);
    }

    function setupHeadingLinks() {
        const headings = document.querySelectorAll(".markdown-content h2, .markdown-content h3");
        headings.forEach(heading => {
            if (heading.querySelector(".heading-link-btn")) {
                return;
            }

            const id = heading.id?.replace("heading-", "") ?? "";
            if (!id) {
                return;
            }

            heading.classList.add("group/heading", "flex", "items-center", "gap-2");

            const button = document.createElement("button");
            button.className = "heading-link-btn opacity-30 md:opacity-0 md:group-hover/heading:opacity-50 hover:!opacity-100 transition-opacity flex-shrink-0";
            button.title = "Copy link";
            button.innerHTML = `<i class="ph ph-link" style="font-size:16px"></i>`;

            button.addEventListener("click", async () => {
                const url = `${window.location.origin}${window.location.pathname}#heading-${id}`;
                await navigator.clipboard.writeText(url);
                button.innerHTML = `<i class="ph ph-check" style="font-size:16px"></i>`;
                setTimeout(() => {
                    button.innerHTML = `<i class="ph ph-link" style="font-size:16px"></i>`;
                }, 2000);
            });

            heading.appendChild(button);
        });
    }

    onMount(async () => {
        const slugParam = $page.params.slug || "";
        const id = extractIdFromSlug(slugParam) ?? slugParam;

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
            checkHashAndScroll();

            const expectedSlug = `${generateSlug(data.markdown)}--${data.id}`;
            if (slugParam !== expectedSlug) {
                const hash = window.location.hash;
                history.replaceState(null, "", `/post/${expectedSlug}${hash}`);
            }
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
                                <i class="ph ph-clock text-[14px]" aria-hidden="true"></i>
                                {readingTime} min read
                            </span>
                        </div>
                    </div>

                    {#if tableOfContents.length > 0}
                        <div class="border border-border rounded-lg" bind:this={tocElement}>
                            <button
                                on:click={() => tocOpen = !tocOpen}
                                class="w-full flex items-center justify-between p-4 text-sm font-medium"
                            >
                                <span class="flex items-center gap-2">
                                    <i class="ph ph-list text-base" aria-hidden="true"></i>
                                    Table of Contents
                                </span>
                                <i
                                    class="ph ph-caret-down text-base transition-transform {tocOpen ? 'rotate-180' : ''}"
                                    aria-hidden="true"
                                ></i>
                            </button>

                            {#if tocOpen}
                                <div class="px-4 pb-4 space-y-1">
                                    {#each tableOfContents as item}
                                        <div
                                            class="flex items-center gap-2 py-1"
                                            class:pl-0={item.level === 2}
                                            class:pl-4={item.level === 3}
                                        >
                                            <button
                                                on:click={() => scrollToHeading(item.id)}
                                                class="flex-1 text-left text-sm transition-opacity"
                                                class:opacity-100={activeHeadingId === item.id}
                                                class:opacity-40={activeHeadingId !== item.id}
                                            >
                                                {item.text}
                                            </button>
                                            <button
                                                on:click={() => copyHeadingLink(item.id)}
                                                class="opacity-30 hover:opacity-100 transition-opacity shrink-0"
                                                title="Copy link"
                                            >
                                                {#if linkCopiedId === item.id}
                                                    <i class="ph ph-check text-[14px]" aria-hidden="true"></i>
                                                {/if}
                                                {#if linkCopiedId !== item.id}
                                                    <i class="ph ph-link text-[14px]" aria-hidden="true"></i>
                                                {/if}
                                            </button>
                                        </div>
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
                            {:else if block.type === "page" && block.children}
                                <div class="nested-page my-4">
                                    <button
                                        on:click={() => togglePage(block.id)}
                                        class="w-full flex items-center gap-3 p-4 border border-border hover:border-primary/30 transition-colors text-left"
                                    >
                                        <i
                                            class="ph ph-caret-right shrink-0 text-[18px] opacity-50 transition-transform duration-200 {expandedPages[block.id] ? 'rotate-90' : ''}"
                                            aria-hidden="true"
                                        ></i>
                                        <span class="font-medium">{block.title}</span>
                                    </button>
                                    {#if expandedPages[block.id]}
                                        <div class="nested-page-content border-l-2 border-border ml-2 pl-4 py-3">
                                            {#each block.children as child (child.id)}
                                                {#if child.type === "html"}
                                                    {@html child.content}
                                                {:else if child.type === "image"}
                                                    <div class="relative my-4">
                                                        {#if !imageLoadingStates[child.id]}
                                                            <Skeleton class="w-full h-48 rounded-lg" />
                                                        {/if}
                                                        <img
                                                            src={child.url}
                                                            alt={child.altText ?? ""}
                                                            class="max-w-full h-auto rounded-lg transition-opacity duration-300"
                                                            class:opacity-0={!imageLoadingStates[child.id]}
                                                            class:opacity-100={imageLoadingStates[child.id]}
                                                            on:load={() => handleImageLoad(child.id)}
                                                        />
                                                    </div>
                                                {/if}
                                            {/each}
                                        </div>
                                    {/if}
                                </div>
                            {/if}
                        {/each}
                    </div>

                    {#if prevPost || nextPost}
                        <div class="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4">
                            {#if prevPost}
                                <a
                                    href={createPostUrl(prevPost.id, prevPost.title)}
                                    class="group p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                                >
                                    <span class="text-xs opacity-50 flex items-center gap-1">
                                        <i class="ph ph-arrow-left text-xs" aria-hidden="true"></i>
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
                                    href={createPostUrl(nextPost.id, nextPost.title)}
                                    class="group p-4 border border-border rounded-lg hover:border-primary/50 transition-colors text-right"
                                >
                                    <span class="text-xs opacity-50 flex items-center justify-end gap-1">
                                        Next
                                        <i class="ph ph-arrow-right text-xs" aria-hidden="true"></i>
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
                            <a href="/rss.xml" target="_blank" rel="noopener noreferrer" class="opacity-50 hover:opacity-100" title="RSS Feed">
                                <i class="ph ph-rss text-base" aria-hidden="true"></i>
                            </a>
                            <button on:click={shareOnTwitter} class="opacity-50 hover:opacity-100" title="Share on X">
                                <i class="ph ph-x-logo text-base" aria-hidden="true"></i>
                            </button>
                            <button on:click={shareOnLinkedIn} class="opacity-50 hover:opacity-100" title="Share on LinkedIn">
                                <i class="ph ph-linkedin-logo text-base" aria-hidden="true"></i>
                            </button>
                            <button on:click={copyLink} class="opacity-50 hover:opacity-100" title="Copy link">
                                {#if copied}
                                    <i class="ph ph-check text-base" aria-hidden="true"></i>
                                {/if}
                                {#if !copied}
                                    <i class="ph ph-link text-base" aria-hidden="true"></i>
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
        <i class="ph ph-caret-up text-xl" aria-hidden="true"></i>
    </button>
{/if}

{#if showStickyToc && tableOfContents.length > 0}
    <div class="fixed top-20 right-8 w-56 hidden xl:block z-40">
        <div class="border border-border rounded-lg bg-background/95 backdrop-blur-sm p-4">
            <span class="flex items-center gap-2 text-sm font-medium mb-3">
                <i class="ph ph-list text-base" aria-hidden="true"></i>
                Table of Contents
            </span>
            <div class="space-y-1">
                {#each tableOfContents as item}
                    <div
                        class="group/item flex items-center gap-1.5"
                        class:pl-0={item.level === 2}
                        class:pl-3={item.level === 3}
                    >
                        <button
                            on:click={() => scrollToHeading(item.id)}
                            class="flex-1 text-left text-sm transition-all py-1 hover:opacity-100"
                            class:opacity-100={activeHeadingId === item.id}
                            class:text-primary={activeHeadingId === item.id}
                            class:font-medium={activeHeadingId === item.id}
                            class:opacity-40={activeHeadingId !== item.id}
                        >
                            {item.text}
                        </button>
                        <button
                            on:click={() => copyHeadingLink(item.id)}
                            class="opacity-0 group-hover/item:opacity-50 hover:opacity-100! transition-opacity shrink-0"
                            title="Copy link"
                        >
                            {#if linkCopiedId === item.id}
                                <i class="ph ph-check text-xs" aria-hidden="true"></i>
                            {/if}
                            {#if linkCopiedId !== item.id}
                                <i class="ph ph-link text-xs" aria-hidden="true"></i>
                            {/if}
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <button
        on:click={() => mobileTocOpen = true}
        class="fixed bottom-6 left-6 p-3 bg-muted text-foreground rounded-full shadow-lg hover:bg-muted/80 transition-all z-40 xl:hidden"
        title="Table of Contents"
    >
        <i class="ph ph-list text-xl" aria-hidden="true"></i>
    </button>
{/if}

{#if mobileTocOpen}
    <div class="fixed inset-0 z-50 xl:hidden">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button
            on:click={() => mobileTocOpen = false}
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        ></button>

        <div class="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-6 max-h-[60vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-4">
                <span class="flex items-center gap-2 text-sm font-medium">
                    <i class="ph ph-list text-base" aria-hidden="true"></i>
                    Table of Contents
                </span>
                <!-- svelte-ignore a11y_consider_explicit_label -->
                <button on:click={() => mobileTocOpen = false} class="p-1 opacity-50 hover:opacity-100">
                    <i class="ph ph-x text-xl" aria-hidden="true"></i>
                </button>
            </div>

            <div class="space-y-2">
                {#each tableOfContents as item}
                    <div
                        class="flex items-center gap-2 py-2"
                        class:pl-0={item.level === 2}
                        class:pl-4={item.level === 3}
                    >
                        <button
                            on:click={() => scrollToHeading(item.id)}
                            class="flex-1 text-left text-sm transition-all hover:opacity-100"
                            class:opacity-100={activeHeadingId === item.id}
                            class:text-primary={activeHeadingId === item.id}
                            class:font-medium={activeHeadingId === item.id}
                            class:opacity-40={activeHeadingId !== item.id}
                        >
                            {item.text}
                        </button>
                        <button
                            on:click={() => copyHeadingLink(item.id)}
                            class="opacity-30 hover:opacity-100 transition-opacity shrink-0"
                            title="Copy link"
                        >
                            {#if linkCopiedId === item.id}
                                <i class="ph ph-check text-[14px]" aria-hidden="true"></i>
                            {/if}
                            {#if linkCopiedId !== item.id}
                                <i class="ph ph-link text-[14px]" aria-hidden="true"></i>
                            {/if}
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}
