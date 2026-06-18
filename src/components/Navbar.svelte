<script lang="ts">
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { setTheme } from "$lib/utils/theme";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Kbd } from "$lib/components/ui/kbd";
    import { locales, type Locale, useI18n } from "$lib/i18n";

    let theme = $state<'light' | 'dark'>('light');
    let modifier = $state("Ctrl");
    const { t, getLocale, setLocale } = useI18n();

    onMount(() => {
        if (browser) {
            modifier = navigator.platform.includes('Mac') ? '⌘' : 'Ctrl';
            const storedTheme = localStorage.getItem('theme');
            theme = storedTheme === 'dark' ? 'dark' : 'light';
            setTheme(theme);

            const handleKeydown = (e: KeyboardEvent) => {
                if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    toggleTheme();
                }
            };

            window.addEventListener('keydown', handleKeydown);
            return () => window.removeEventListener('keydown', handleKeydown);
        }
    });

    function toggleTheme() {
        theme = theme === 'light' ? 'dark' : 'light';
        setTheme(theme);
    }

    function selectLocale(locale: string) {
        setLocale(locale as Locale);
    }
</script>

<nav class="w-full h-14 justify-center items-center flex mx-auto my-2">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <div class="flex items-center justify-between w-full max-w-6xl">
        <a href="/" class="text-lg md:text-xl font-bold">
            <h1>Fatih Yılmaz</h1>
        </a>
        <!-- Desktop and Tablet Menu -->
        <ul class="hidden md:flex space-x-4 text-sm">
            <li><a href="https://github.com/queaxtra" class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" aria-label="GitHub profile">
                <i class="ph ph-github-logo text-[15px]" aria-hidden="true"></i>
            </a></li>
            <li><a href="https://x.com/queaxtra" class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" aria-label="X (Twitter) profile">
                <i class="ph ph-x-logo text-[15px]" aria-hidden="true"></i>
            </a></li>
            <li>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white uppercase text-xs font-semibold bg-transparent border-none outline-none cursor-pointer" aria-label={t("nav.language")}>
                        <i class="ph ph-globe-hemisphere-east text-[15px]" aria-hidden="true"></i>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content class="w-32" align="end">
                        <DropdownMenu.RadioGroup value={getLocale()} onValueChange={selectLocale}>
                            {#each locales as locale}
                                <DropdownMenu.RadioItem value={locale}>
                                    {t(`language.${locale}`)}
                                </DropdownMenu.RadioItem>
                            {/each}
                        </DropdownMenu.RadioGroup>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </li>
            <li>
                <Tooltip.Provider delayDuration={100}>
                        <Tooltip.Root>
                        <Tooltip.Trigger>
                            <button onclick={toggleTheme} class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" aria-label={theme === 'light' ? t("nav.theme.switchDark") : t("nav.theme.switchLight")}>
                                {#if theme === 'light'}
                                    <i class="ph ph-sun text-[15px]" aria-hidden="true"></i>
                                {/if}
                                {#if theme === 'dark'}
                                    <i class="ph ph-moon text-[15px]" aria-hidden="true"></i>
                                {/if}
                            </button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                            <div class="flex items-center gap-2">
                                <span>{t("nav.theme.toggle")}</span>
                                <Kbd><span class="text-xs">{modifier}</span>B</Kbd>
                            </div>
                        </Tooltip.Content>
                    </Tooltip.Root>
                </Tooltip.Provider>
            </li>
        </ul>

        <!-- Mobile Menu -->
        <ul class="flex md:hidden space-x-4 text-sm">
            <li><a href="https://github.com/queaxtra" class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" aria-label="GitHub profile">
                <i class="ph ph-github-logo text-[15px]" aria-hidden="true"></i>
            </a></li>
            <li><a href="https://x.com/queaxtra" class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" aria-label="X (Twitter) profile">
                <i class="ph ph-x-logo text-[15px]" aria-hidden="true"></i>
            </a></li>
            <li>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white uppercase text-xs font-semibold bg-transparent border-none outline-none cursor-pointer" aria-label={t("nav.language")}>
                        <i class="ph ph-globe-hemisphere-east text-[15px]" aria-hidden="true"></i>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content class="w-32" align="end">
                        <DropdownMenu.RadioGroup value={getLocale()} onValueChange={selectLocale}>
                            {#each locales as locale}
                                <DropdownMenu.RadioItem value={locale}>
                                    {t(`language.${locale}`)}
                                </DropdownMenu.RadioItem>
                            {/each}
                        </DropdownMenu.RadioGroup>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </li>
            <li>
                <button onclick={toggleTheme} class="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white" aria-label={theme === 'light' ? t("nav.theme.switchDark") : t("nav.theme.switchLight")}>
                    {#if theme === 'light'}
                        <i class="ph ph-sun text-[15px]" aria-hidden="true"></i>
                    {/if}
                    {#if theme === 'dark'}
                        <i class="ph ph-moon text-[15px]" aria-hidden="true"></i>
                    {/if}
                </button>
            </li>
        </ul>
    </div>
</nav>
