<script>
    let age = new Date().getFullYear() - 2005;
    import * as HoverCard from "$lib/components/ui/hover-card/index";
</script>

<section class="w-full">
    <!-- dashed border -->
    <section class="border-y border-border/50">
        <div class="h-1.5 w-full dashed-border"></div>
    </section>

    <div class="w-full py-6">
        <div class="space-y-4">
            <h1 class="text-xl md:text-2xl font-bold">~/about</h1>
            <p class="text-black/50 dark:text-white/50 leading-relaxed">
                I am a {age} year-old developer based in
                <HoverCard.Root>
                    <HoverCard.Trigger class="text-black dark:text-white underline cursor-help">Türkiye</HoverCard.Trigger>
                    <HoverCard.Content class="w-80">
                        <div class="space-y-4">
                            <div class="flex items-center space-x-4">
                                <span class="text-6xl">🇹🇷</span>
                                <div>
                                    <h4 class="text-sm font-semibold">Türkiye</h4>
                                    <p class="text-sm text-muted-foreground">Turkey</p>
                                </div>
                            </div>
                            <p class="text-sm leading-relaxed">
                                Transcontinental country bridging Europe and Asia. Known for its rich history, strategic location, and vibrant culture.
                            </p>
                            <div class="text-xs space-y-1">
                                <p><span class="font-semibold">Coordinates:</span> 38.9637° N, 35.2433° E</p>
                                <p><span class="font-semibold">Capital:</span> Ankara</p>
                                <p><span class="font-semibold">Largest City:</span> Istanbul</p>
                            </div>
                        </div>
                    </HoverCard.Content>
                </HoverCard.Root>

                , with a strong focus on cryptography and software security. My work emphasizes robust encryption systems and secure software design, reflecting a deep commitment to technical excellence and continuous learning. As a member of

                <HoverCard.Root>
                    <HoverCard.Trigger class="text-black dark:text-white underline cursor-help"><a href="https://github.com/K9Crypt" class="hover:underline">@K9Crypt</a></HoverCard.Trigger>
                    <HoverCard.Content class="w-80">
                        <div class="space-y-4">
                            <div class="flex items-center space-x-4">
                                <img src="https://www.upload.ee/image/18642009/k9crypt-new-rounded.png" alt="K9Crypt" class="w-16 h-16 rounded-lg" />
                                <div>
                                    <h4 class="text-sm font-semibold">K9Crypt</h4>
                                    <p class="text-sm text-muted-foreground">Security & Privacy</p>
                                </div>
                            </div>
                            <p class="text-sm leading-relaxed">
                                Military-grade encryption platform focused on secure messaging and zero-knowledge architecture. Provides end-to-end encryption with no data retention.
                            </p>
                            <div class="text-xs space-y-2">
                                <p><span class="font-semibold">Mission:</span> Privacy as a fundamental human right</p>
                                <p><span class="font-semibold">Features:</span> E2E Encryption, Zero-Knowledge, Open Source, Self-Destructing Messages</p>
                            </div>
                        </div>
                    </HoverCard.Content>
                </HoverCard.Root> on GitHub, I contribute to and lead projects centered on security and cryptographic solutions. I value precision, thoroughness, and professionalism in every stage of development, ensuring that each project meets the highest standards before release. Outside of my core work, I actively explore emerging technologies and engage with the latest research to refine my expertise and drive innovation.
            </p>
        </div>
    </div>

    <!-- dashed border -->
    <section class="border-y border-border/50">
        <div class="h-1.5 w-full dashed-border"></div>
    </section>
</section>
