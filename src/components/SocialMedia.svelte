<script>
    import Tooltip from "../ui/Tooltip.svelte";

    let socialMedia = [
        {
            name: 'GitHub',
            link: 'https://github.com/queaxtra',
            icon: 'ri-github-fill'
        },
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/queaxtra/',
            icon: 'ri-linkedin-fill'
        },
        {
            name: 'Twitter',
            link: 'https://twitter.com/queaxtra',
            icon: 'ri-twitter-x-fill'
        },
        {
            name: 'Instagram',
            link: 'https://www.instagram.com/queaxtra/',
            icon: 'ri-instagram-fill'
        }
    ]
</script>

<div class="flex justify-center mt-2">
    {#each socialMedia as sm}
    <a href={sm.link} target="_blank" rel="noreferrer" class="mx-2 w-8 h-8 rounded-full flex justify-center items-center bg-qLightGray dark:bg-qDarkBlack"><i class={sm.icon}></i></a>
    {/each}
</div>