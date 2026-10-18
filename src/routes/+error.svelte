<script lang="ts">
    import { page } from '$app/stores';
    import Button from '$lib/components/ui/button/button.svelte';
    import { useI18n } from '$lib/i18n';

    const { t } = useI18n();

    const statusKeys: Record<number, string> = {
        404: 'error.notFound',
        500: 'error.server',
    };

    const message = $derived(
        ($page.status && statusKeys[$page.status] ? t(statusKeys[$page.status]) : '') ||
            $page.error?.message ||
            t('error.title'),
    );
</script>

<section class="min-h-screen w-full flex justify-center items-center">
    <div class="flex justify-center items-center w-full max-w-6xl mx-auto px-4">
        <div class="text-center space-y-4">
            <h1 class="text-4xl md:text-5xl font-bold">{$page.status}: {message}</h1>
            <p class="text-lg opacity-50">{t('error.description')}</p>

            <div class="flex justify-center space-x-4">
                <Button variant="secondary" onclick={() => window.history.back()}>{t('error.back')}</Button>
                <Button href="/">{t('error.home')}</Button>
            </div>
        </div>
    </div>
</section>
