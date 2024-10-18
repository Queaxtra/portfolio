<script>
    import { goto } from "$app/navigation";

    let skillsArray = [
        { name: "HTML", level: "Advanced" },
        { name: "CSS", level: "Advanced" },
        { name: "JavaScript", level: "Advanced" },
        { name: "Typescript", level: "Intermediate" },
        { name: "Svelte", level: "Advanced" },
        { name: "Next.js", level: "Advanced" },
        { name: "Node.js", level: "Advanced" },
        { name: "TailwindCSS", level: "Intermediate" },
        { name: "Supabase", level: "Advanced" },
        { name: "Pocketbase", level: "Intermediate" },
        { name: "Firebase", level: "Advanced" },
        { name: "MongoDB", level: "Advanced" }
    ];
</script>

<section class="flex flex-col lg:flex-row items-center justify-between py-24 px-6 lg:px-32 bg-cLightGray">
    <div class="w-full lg:w-1/2 text-left space-y-5">
        <h2 class="text-3xl lg:text-4xl font-extrabold">About me</h2>
        <div class="flex flex-col space-y-4">
            <p>Hi, I'm Fatih Yılmaz, as a front-end developer based in Turkey, I lead UnoxDevs, a team dedicated to building exceptional web experiences. We prioritize user comfort and accessibility in all our projects</p>
            <p>We focus on simplicity and elegance in our designs, while also ensuring our applications are fast, secure, and scalable. We're always looking for new ways to improve the user experience and make a positive impact on people's lives.</p>
        </div>

        <div class="flex justify-start mt-4 space-x-3">
            <img src="https://www.upload.ee/image/17273002/IMG_20230619_150930_703.jpg" alt="Profile Photo" class="w-12 h-12 rounded-full object-cover shadow-md" />
            <div class="flex flex-col">
                <span class="font-bold">Fatih Yılmaz</span>
                <span class="text-sm opacity-80">Founder of UnoxDevs</span>
            </div>
        </div>
    </div>

    <div class="w-full lg:w-1/2 space-y-5 mt-20 lg:mt-0 lg:ml-12">
        <h3 class="text-2xl lg:text-3xl font-extrabold">Skills</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {#each skillsArray as skill}
            <div class="bg-background p-4 text-center">
                <h4 class="text-lg font-semibold">{skill.name}</h4>
                <p class="text-sm opacity-80">{skill.level}</p>
            </div>
            {/each}
        </div>
    </div>
</section>
