<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
    import Hero from "../components/Hero.svelte";
    import About from "../components/About.svelte";
    import Contributions from "../components/Contributions.svelte";
    import Contact from "../components/Contact.svelte";
    import Footer from "../components/Footer.svelte";
    import { useI18n } from "$lib/i18n";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    const { t } = useI18n();
</script>

<svelte:head>
    <title>Fatih Yılmaz</title>
    <meta name="description" content={t("meta.description")} />
</svelte:head>

<div class="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-120">
    <Navbar />
    <main>
        <Hero />
        <About />
        <Contributions contributions={data.contributions} errorMessage={data.contributionsError} />
        <Contact />
    </main>
    <Footer />
</div>
