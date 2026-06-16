<script lang="ts">
    import * as Tooltip from "$lib/components/ui/tooltip";

    type ContributionDay = {
        date: string;
        count: number;
        level: number;
    };

    type ContributionWeek = {
        firstDay: string;
        days: ContributionDay[];
    };

    type ContributionResponse = {
        username: string;
        total: number;
        weeks: ContributionWeek[];
    };

    let {
        contributions,
        errorMessage = ""
    }: {
        contributions: ContributionResponse | null;
        errorMessage?: string;
    } = $props();

    const monthFormatter = new Intl.DateTimeFormat("en", { month: "short" });
    const dateFormatter = new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
    const weekdays = [
        { label: "Mon", row: 2 },
        { label: "Wed", row: 4 },
        { label: "Fri", row: 6 }
    ];
    const densityClasses = [
        "bg-slate-200 dark:bg-[#2d333d]",
        "bg-emerald-200 dark:bg-[#0e4429]",
        "bg-emerald-300 dark:bg-[#006d32]",
        "bg-emerald-500 dark:bg-[#26a641]",
        "bg-emerald-600 dark:bg-[#39d353]"
    ];

    let contributionTotal = $derived(new Intl.NumberFormat("en").format(contributions?.total ?? 0));
    let weeks = $derived(contributions?.weeks ?? []);
    let months = $derived(getMonths(weeks));

    function getMonths(contributionWeeks: ContributionWeek[]) {
        let lastMonth = "";

        return contributionWeeks.reduce<Array<{ label: string; column: number }>>((items, week, index) => {
            const month = monthFormatter.format(new Date(`${week.firstDay}T00:00:00Z`));

            if (month === lastMonth) {
                return items;
            }

            lastMonth = month;
            items.push({ label: month, column: index + 1 });

            return items;
        }, []);
    }

    function formatDayLabel(day: ContributionDay) {
        const contributionLabel = day.count === 1 ? "contribution" : "contributions";
        const dateLabel = dateFormatter.format(new Date(`${day.date}T00:00:00Z`));

        return `${day.count} ${contributionLabel} on ${dateLabel}`;
    }
</script>

<section class="w-full">
    <div class="w-full py-6">
        <div class="space-y-4">
            <div class="rounded-lg border border-border/80 bg-white/50 p-3 shadow-sm dark:bg-white/5 dark:backdrop-blur-lg sm:p-4">
                {#if errorMessage}
                    <div class="flex h-36 flex-col items-center justify-center gap-3 text-center text-xs text-black/55 dark:text-white/55">
                        <p>{errorMessage}</p>
                    </div>
                {:else}
                <div class="overflow-x-auto pb-2" aria-label="GitHub style contribution activity graph" role="img">
                    <div class="min-w-[740px]">
                        <div class="ml-10 grid grid-cols-[repeat(53,0.75rem)] gap-[3px] pb-2 text-xs font-medium text-black/60 dark:text-white/65">
                            {#each months as month}
                                <span style={`grid-column: ${month.column};`}>{month.label}</span>
                            {/each}
                        </div>

                        <div class="flex gap-2">
                            <div class="grid grid-rows-[repeat(7,0.75rem)] gap-[3px] pt-0 text-xs font-medium text-black/60 dark:text-white/65">
                                {#each weekdays as weekday}
                                    <span class="leading-3" style={`grid-row: ${weekday.row};`}>{weekday.label}</span>
                                {/each}
                            </div>

                            <Tooltip.Provider delayDuration={100}>
                                <div class="grid grid-flow-col grid-rows-[repeat(7,0.75rem)] gap-[3px]">
                                    {#each weeks as week}
                                        {#each week.days as day}
                                            <Tooltip.Root>
                                                <Tooltip.Trigger>
                                                    <button
                                                        class={`size-3 rounded-[3px] outline-none ring-offset-2 ring-offset-background transition-transform hover:scale-125 focus-visible:scale-125 focus-visible:ring-2 focus-visible:ring-emerald-500 ${densityClasses[day.level]}`}
                                                        type="button"
                                                        aria-label={formatDayLabel(day)}
                                                    ></button>
                                                </Tooltip.Trigger>
                                                <Tooltip.Content sideOffset={8}>
                                                    {formatDayLabel(day)}
                                                </Tooltip.Content>
                                            </Tooltip.Root>
                                        {/each}
                                    {/each}
                                </div>
                            </Tooltip.Provider>
                        </div>

                        <div class="mt-3 flex justify-end pl-10 text-xs font-medium text-black/55 dark:text-white/55">
                            <div class="flex items-center gap-1.5">
                                <span>Less</span>
                                <span class={`size-3 rounded-[3px] ${densityClasses[0]}`} aria-hidden="true"></span>
                                <span class={`size-3 rounded-[3px] ${densityClasses[1]}`} aria-hidden="true"></span>
                                <span class={`size-3 rounded-[3px] ${densityClasses[2]}`} aria-hidden="true"></span>
                                <span class={`size-3 rounded-[3px] ${densityClasses[3]}`} aria-hidden="true"></span>
                                <span class={`size-3 rounded-[3px] ${densityClasses[4]}`} aria-hidden="true"></span>
                                <span>More</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/if}
            </div>
        </div>
    </div>

    <section class="border-y border-border/50">
        <div class="h-1.5 w-full dashed-border"></div>
    </section>
</section>
