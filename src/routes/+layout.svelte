<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');

	:global(body) {
		font-family: 'Geist', sans-serif;
		margin: 0;
		padding: 0;
		justify-content: center;
		background-color: #fcfcfc;
	}
</style>
