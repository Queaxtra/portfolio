<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
    import { createI18nContext } from '$lib/i18n';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
    createI18nContext(() => data.i18n);

	onMount(() => {
		const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
	});
</script>

{@render children()}

<style>
	@import url('https://fonts.cdnfonts.com/css/sf-pro-display');

	:global(body) {
		font-family: 'SF Pro Display', sans-serif;
		margin: 0;
		padding: 0;
		justify-content: center;
		background-color: var(--background);
	}

	:global(.dark body) {
		background-color: #050505;
	}

	:global(h1) {
		font-family: 'SF Pro Display', sans-serif;
		font-weight: 700;
	}
</style>
