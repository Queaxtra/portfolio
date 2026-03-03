export interface Project {
  title: string;
  description: string;
  href?: string;
  tags?: string[];
}

export const projects: Project[] = [
  {
    title: "K9Crypt",
    description: "Privacy-first messaging with end-to-end encryption and zero-knowledge architecture. No data retention, open source, cross-platform (iOS, Android, Windows, macOS). Self-destructing messages, Argon2 and SHA512, ad-free.",
    href: "https://k9crypt.xyz/"
  },
  {
    title: "svelte-doctor",
    description: "Diagnose and fix performance, correctness, and architecture issues in your Svelte codebase. 33 diagnostic rules, AI-powered auto-fix, Svelte 4→5 migration, live watch mode, dependency health checks. Zero config.",
    href: "https://github.com/pimatis/svelte-doctor"
  },
  {
    title: "Raco",
    description: "High-performance terminal-based HTTP client with 3-panel TUI. HTTP, WebSocket, and gRPC support. File upload/download, mouse & keyboard, clipboard, Git-friendly JSON/YAML storage, request history, metrics dashboard.",
    href: "https://github.com/Queaxtra/raco"
  },
  {
    title: "Zvelte",
    description: "CLI to scaffold SvelteKit projects with Shadcn UI, Tailwind CSS, and i18n. Clones a production-ready template; auto-updates package.json name, description, and version. Run with bunx, no global install.",
    href: "https://github.com/Queaxtra/zvelte"
  },
  {
    title: "Zyla",
    description: "AI-powered instant translation for everyone. Translate any text on the web in one click. Free, unlimited, fast. Web app and browser extension. No character limits or sign-up required.",
    href: "https://getzyla.xyz/"
  }
];
