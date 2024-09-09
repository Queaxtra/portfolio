<script lang="ts">
    import SocialMedia from "./SocialMedia.svelte";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import Contact from "./Contact.svelte";

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

<div class="flex items-center justify-center min-h-screen w-full px-4">
    <div class="text-center max-w-2xl mx-auto">
        <h1 class="text-4xl font-extrabold mt-2">Fatih Yılmaz</h1>
        <p class="text-sm mt-2 text-black/30 dark:text-white/30">Front-end Developer</p>
        <div class="mt-4">
            <p class="text-sm">As a front-end developer based in Turkey, I lead UnoxDevs, a team dedicated to building exceptional web experiences. We prioritize user comfort and accessibility in all our projects <button on:click={setTheme} class="underline decoration-dashed">that's why you will find a theme transition in this text.</button> This is just one example of how we tailor our work to individual preferences.</p>
        </div>
        <SocialMedia />
        <Contact />
    </div>
</div>