<script>
    import Navbar from "../components/Navbar.svelte";
    import Banner from "../components/Banner.svelte";
    import About from "../components/About.svelte";
    import Skills from "../components/Skills.svelte";
    import Projects from "../components/Projects.svelte";
    import Contact from "../components/Contact.svelte";
    import Footer from "../components/Footer.svelte";
</script>

<Navbar />
<Banner />
<div class="grid grid-cols-1 md:grid-cols-2 md:px-20 px-0">
    <About />
    <Skills />
    <Projects />
    <Contact />
</div>
<Footer />