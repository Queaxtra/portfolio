<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    let showPopup = false;

    function togglePopup() {
        showPopup = !showPopup;
        document.body.style.overflow = showPopup ? 'hidden' : 'auto';
    }

    onMount(() => {
        if (showPopup) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    });
</script>

<section class="flex flex-col-reverse lg:flex-row items-center justify-between py-24 px-6 lg:px-32">
    <div class="w-full lg:w-1/2 text-center lg:text-left space-y-5">
        <div class="flex justify-center lg:justify-start items-center space-x-3">
            <h2 class="text-xl lg:text-2xl font-bold">Hi, I'm Fatih Yılmaz</h2>
        </div>
        <h1 class="text-4xl lg:text-5xl font-extrabold leading-tight">Front-end Developer</h1>
        <p>I specialize in crafting creative web projects. Explore my portfolio or dive into my blog to discover more about my work.</p>

        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button on:click={togglePopup} class="w-full sm:w-auto bg-cBlack text-white px-6 py-2">Contact</button>
            <a href="https://read.cv/queaxtra" class="w-full sm:w-auto border border-cGray px-6 py-2">Download CV</a>
        </div>
    </div>
</section>

{#if showPopup}
<div transition:fade="{{ duration: 300 }}" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div class="bg-background p-8 max-w-md w-full">
        <h2 class="text-2xl font-bold mb-2">Contact</h2>
        <p class="text-sm mb-6">If you would like to chat or send me a message, please don't hesitate to reach out. I'm always open to new opportunities and collaborations.</p>
        <div class="flex flex-col space-y-4 mb-6">
            <a href="https://t.me/queaxtra" target="_blank" rel="noopener noreferrer" class="border border-cGray px-6 py-2 text-center">Telegram</a>
            <a href="https://linkedin.com/in/queaxtra" target="_blank" rel="noopener noreferrer" class="border border-cGray px-6 py-2 text-center">LinkedIn</a>
            <a href="https://x.com/queaxtra" target="_blank" rel="noopener noreferrer" class="border border-cGray px-6 py-2 text-center">X</a>
        </div>
        <button on:click={togglePopup} class="bg-cBlack text-white px-6 py-2 w-full">Close</button>
    </div>
</div>
{/if}
