<script lang="ts">
    const contacts = [
        {
            title: "Email",
            description: "You can send me an e-mail.",
            href: "mailto:queaxtra@proton.me",
            buttonText: "Contact"
        },
        {
            title: "Telegram",
            description: "We can meet on Telegram.",
            href: "https://t.me/queaxtra",
            buttonText: "Contact"
        },
        {
            title: "X",
            description: "You can DM me on X (Twitter).",
            href: "https://twitter.com/queaxtra",
            buttonText: "Contact"
        }
    ];

    let activeIndex: number | null = null;

    function toggleAccordion(index: number) {
        if (activeIndex === index) {
            activeIndex = null;
        } else {
            activeIndex = index;
        }
    }
</script>

<div class="flex py-12 px-4">
    <div class="w-full max-w-6xl">
        <h1 class="text-xl font-extrabold flex right-0 mb-2">Contact</h1>
        <p class="text-xs flex right-0 text-black/50 dark:text-white/50 mb-4">Feel free to contact me.</p>

        <div class="flex flex-col gap-4">
            {#each contacts as contact, index}
                <div class="bg-qLightGray dark:bg-qDarkBlack rounded-lg">
                    <button on:click={() => toggleAccordion(index)} class="w-full text-left p-4 text-base font-bold flex justify-between items-center">
                        {contact.title}
                        <span class="ml-2">{activeIndex === index ? "-" : "+"}</span>
                    </button>
                    {#if activeIndex === index}
                        <div class="p-4 border-t border-qGray dark:border-qDarkGray">
                            <p class="text-sm flex right-0 text-black/70 dark:text-white/70">{contact.description}</p>
                            <div class="mt-4 flex right-0">
                                <a href={contact.href} target="_blank" rel="noreferrer" class="bg-qGray dark:bg-qDarkGray rounded-lg px-8 py-2 text-sm">{contact.buttonText}</a>
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>