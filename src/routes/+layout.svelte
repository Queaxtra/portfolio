<script lang="ts" module>
	import type { LayoutProps } from './$types';

	export type I18nContext = LayoutProps['data']['i18n'];
</script>

<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
    import { createI18nContext } from '$lib/i18n';

	let { children, data }: LayoutProps = $props();
    createI18nContext(() => data.i18n);

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
