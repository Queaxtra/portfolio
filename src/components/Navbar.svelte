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
            <li><a href="https://github.com/queaxtra" class="opacity-50 hover:opacity-100"><i class="ri-github-fill"></i></a></li>
            <li><a href="https://x.com/queaxtra" class="opacity-50 hover:opacity-100"><i class="ri-twitter-x-line"></i></a></li>
            <li>
                <button on:click={toggleTheme} class="opacity-50 hover:opacity-100">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        {#if theme === 'light'}
                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 101.06-1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                        {:else}
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                        {/if}
                    </svg>
                </button>
            </li>
        </ul>

        <!-- Mobile Menu -->
        <ul class="flex md:hidden space-x-4 text-sm">
            <li><a href="https://github.com/queaxtra" class="opacity-50 hover:opacity-100"><i class="ri-github-fill"></i></a></li>
            <li><a href="https://x.com/queaxtra" class="opacity-50 hover:opacity-100"><i class="ri-twitter-x-line"></i></a></li>
            <li>
                <button on:click={toggleTheme} class="opacity-50 hover:opacity-100">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        {#if theme === 'light'}
                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 101.06-1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                        {:else}
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                        {/if}
                    </svg>
                </button>
            </li>
        </ul>
    </div>
</nav>
