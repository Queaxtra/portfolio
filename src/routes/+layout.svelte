<script lang="ts">
	import '../app.css';
	
	let { children } = $props();
</script>

{@render children()}

<style>
	@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap');

	:global(body) {
		font-family: 'IBM Plex Sans', sans-serif;
		margin: 0;
		padding: 0;
		justify-content: center;
		background-color: #fcfcfc;
	}
</style>