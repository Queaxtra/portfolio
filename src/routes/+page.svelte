<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
    import Hero from "../components/Hero.svelte";
    import About from "../components/About.svelte";
    import Contributions from "../components/Contributions.svelte";
    import Projects from "../components/Projects.svelte";
    import Contact from "../components/Contact.svelte";
    import Footer from "../components/Footer.svelte";
    import { useI18n } from "$lib/i18n";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
    const { t } = useI18n();

    const pageTitle = "Fatih Yılmaz";
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={t("meta.description")} />
</svelte:head>

<div class="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-120">
    <Navbar />
    <main>
        <Hero />
        <About />
        <Contributions contributions={data.contributions} errorMessage={data.contributionsError} />
        <Projects />
        <Contact />
    </main>
    <Footer />
</div>
