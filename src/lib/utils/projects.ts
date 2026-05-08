export interface Project {
  title: string;
  description: string;
  href?: string;
  paused?: boolean;
}

export const projects: Project[] = [
  {
    title: "K9Crypt",
    description: "Privacy-first messaging with end-to-end encryption and zero-knowledge architecture. No data retention, open source, cross-platform (iOS, Android, Windows, macOS). Self-destructing messages, Argon2 and SHA512, ad-free.",
    href: "https://k9crypt.xyz/",
    paused: false
  },
  {
    title: "svelte-doctor",
    description: "Diagnose and fix performance, correctness, and architecture issues in your Svelte codebase. 33 diagnostic rules, AI-powered auto-fix, Svelte 4→5 migration, live watch mode, dependency health checks. Zero config.",
    href: "https://github.com/pimatis/svelte-doctor",
    paused: false
  },
  {
    title: "Raco",
    description: "High-performance terminal-based HTTP client with 3-panel TUI. HTTP, WebSocket, and gRPC support. File upload/download, mouse & keyboard, clipboard, Git-friendly JSON/YAML storage, request history, metrics dashboard.",
    href: "https://github.com/Queaxtra/raco",
    paused: false
  },
  {
    title: "Zvelte",
    description: "CLI to scaffold SvelteKit projects with Shadcn UI, Tailwind CSS, and i18n. Clones a production-ready template; auto-updates package.json name, description, and version. Run with bunx, no global install.",
    href: "https://github.com/Queaxtra/zvelte",
    paused: false
  },
  {
    title: "Zyla",
    description: "AI-powered instant translation for everyone. Translate any text on the web in one click. Free, unlimited, fast. Web app and browser extension. No character limits or sign-up required.",
    href: "https://getzyla.xyz/",
    paused: true
  },
  {
    title: "Peçinler Tel Çit",
    description: "Industrial-grade wire fence manufacturing and installation solutions for residential, agricultural, and commercial projects. Galvanized wire mesh, panel fences, lawn fences, barbed wire, razor wire, concrete posts, nationwide shipping in Turkey, and professional on-site installation services.",
    href: "https://www.pecinlertelcit.com/",
    paused: false
  },
  {
    title: "Mavetis",
    description: "Mavetis is a privacy-first security analysis tool for Git workflows with fully local, zero-network static code review.",
    href: "https://github.com/pimatis/mavetis",
    paused: false
  }
];
