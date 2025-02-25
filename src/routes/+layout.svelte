<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="fixed inset-0 pointer-events-none">
	<div class="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
	<div class="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
</div>

<div class="relative">
	{@render children()}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

	:global(body) {
		font-family: 'Poppins', sans-serif;
		color: rgba(255, 255, 255, 0.77);
		background-color: #080808;
		overflow-x: hidden;
	}
	
	:global(html) {
		scroll-behavior: smooth;
	}
</style>