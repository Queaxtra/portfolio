<script lang="ts">
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { setTheme } from "$lib/utils/theme";

    let theme: 'light' | 'dark' = 'light';

    onMount(() => {
        if (browser) {
            const storedTheme = localStorage.getItem('theme');
            theme = storedTheme === 'dark' ? 'dark' : 'light';
            setTheme(theme);
        }
    });

    function toggleTheme() {
        theme = theme === 'light' ? 'dark' : 'light';
        setTheme(theme);
    }
</script>

<nav class="w-full h-14 justify-center items-center flex mx-auto my-2">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <div class="flex items-center justify-between w-full max-w-6xl">
        <a href="/" class="text-lg md:text-xl font-bold">
            <h1>Fatih Yılmaz</h1>
        </a>
        <!-- Desktop and Tablet Menu -->
        <ul class="hidden md:flex space-x-4 text-sm">
            <li><a href="https://github.com/queaxtra" class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" aria-label="GitHub profile">
                <i class="ph ph-github-logo text-[15px]" aria-hidden="true"></i>
            </a></li>
            <li><a href="https://x.com/queaxtra" class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" aria-label="X (Twitter) profile">
                <i class="ph ph-x-logo text-[15px]" aria-hidden="true"></i>
            </a></li>
            <li>
                <button on:click={toggleTheme} class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}>
                    {#if theme === 'light'}
                        <i class="ph ph-sun text-[15px]" aria-hidden="true"></i>
                    {/if}
                    {#if theme === 'dark'}
                        <i class="ph ph-moon text-[15px]" aria-hidden="true"></i>
                    {/if}
                </button>
            </li>
        </ul>

        <!-- Mobile Menu -->
        <ul class="flex md:hidden space-x-4 text-sm">
            <li><a href="https://github.com/queaxtra" class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" aria-label="GitHub profile">
                <i class="ph ph-github-logo text-[15px]" aria-hidden="true"></i>
            </a></li>
            <li><a href="https://x.com/queaxtra" class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" aria-label="X (Twitter) profile">
                <i class="ph ph-x-logo text-[15px]" aria-hidden="true"></i>
            </a></li>
            <li>
                <button on:click={toggleTheme} class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}>
                    {#if theme === 'light'}
                        <i class="ph ph-sun text-[15px]" aria-hidden="true"></i>
                    {/if}
                    {#if theme === 'dark'}
                        <i class="ph ph-moon text-[15px]" aria-hidden="true"></i>
                    {/if}
                </button>
            </li>
        </ul>
    </div>
</nav>
