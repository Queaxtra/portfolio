<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme === 'dark') {
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		} else {
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
		}
	});
</script>

{@render children()}

<style>
	:global(body) {
		font-family: 'Product Sans', sans-serif;
		margin: 0;
		padding: 0;
		justify-content: center;
		background-color: #fcfcfc;
	}

	:global(.dark body) {
		background-color: #050505;
	}

	:global(h1) {
	    font-family: 'Product Sans Black', sans-serif;
	}
</style>
