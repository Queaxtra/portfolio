<script>
    import { page } from '$app/stores';
    import Button from '$lib/components/ui/button/button.svelte';
</script>

<section class="min-h-screen w-full flex justify-center items-center">
    <div class="flex justify-center items-center w-full max-w-6xl mx-auto px-4">
        <div class="text-center space-y-4">
            <h1 class="text-4xl md:text-5xl font-bold">{$page.status}: {$page.error?.message || 'Something went wrong'}</h1>
            <p class="text-lg opacity-50">Oops! It seems something went wrong. Please try again or go back to the home page.</p>

            <div class="flex justify-center space-x-4">
                <Button variant="secondary" onclick={() => window.history.back()}>Go Back</Button>
                <Button href="/">Home</Button>
            </div>
        </div>
    </div>
</section>
