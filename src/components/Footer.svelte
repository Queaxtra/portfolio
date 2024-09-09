<script>
    import Tooltip from "../ui/Tooltip.svelte";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    const themeStore = writable('light');

    onMount(async () => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') || 'light';
            themeStore.set(savedTheme);
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        }
    });

    function setTheme() {
        themeStore.update(currentTheme => {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', newTheme);
                document.documentElement.classList.toggle('dark', newTheme === 'dark');
            }
            return newTheme;
        });
    }
</script>

<footer class="fixed bottom-0 left-0 w-full py-4 bg-transparent">
    <div class="container mx-auto px-4">
        <div class="flex flex-col sm:flex-row items-center justify-between">
            <p class="text-sm text-black/70 dark:text-white/70 mb-4 sm:mb-0">Open Source on <Tooltip text="Click"><a href="https://github.com/queaxtra/portfolio" target="_blank" rel="noreferrer" class="underline decoration-dashed">GitHub</a></Tooltip></p>
            <div class="mt-2 sm:mt-0 flex items-center">
                <button on:click={setTheme} class="bg-qGray dark:bg-qDarkGray rounded-lg px-8 py-2 text-sm">
                    {$themeStore === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
            </div>
        </div>
    </div>
</footer>