<script>
    import Navbar from "../components/Navbar.svelte";
    import Hero from "../components/Hero.svelte";
    import About from "../components/About.svelte";
    import Posts from "../components/Posts.svelte";
    import Contact from "../components/Contact.svelte";
    import Footer from "../components/Footer.svelte";

    const pageTitle = "Fatih Yılmaz";
    const pageDescription = "Fatih Yılmaz is a front-end developer based in Türkiye, specializing in creative web projects. Explore his portfolio and discover his work.";
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
</svelte:head>

<div class="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-120">
    <Navbar />
    <main>
        <Hero />
        <About />
        <Posts />
        <Contact />
    </main>
    <Footer />
</div>
