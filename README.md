# Portfolio Website

This SvelteKit-based personal portfolio website is designed to effectively showcase your professional identity and blog posts. Its extensible structure allows you to fully personalize your portfolio by adding new features or modifying the existing design.

## Setup and Installation

1. Install the dependencies:

```bash
bun install
# npm install
# yarn install
# pnpm install
````

2. Run the project:

```bash
bun run dev
# npm run dev
# yarn dev
# pnpm dev
```

3. Visit `http://localhost:5173/` in your browser

## Adding Blog Posts

Blog posts are fetched through Craft.do API integration. To configure:

1. Create a Craft.do account at [craft.do](https://craft.do/)
2. Create a shared link for your documents
3. Add your Craft API key to environment variables as `VITE_APP_CRAFTKEY`
4. Update the shared link ID in `src/routes/api/posts/fetch/all/+server.ts` and `src/routes/api/post/[id]/+server.ts`

If you do not wish to use the blog feature, remove the following files:
- `src/components/Posts.svelte`
- `src/routes/api/posts/fetch/all/+server.ts`
- `src/routes/api/post/[id]/+server.ts`
- `src/routes/posts/+page.svelte`
- `src/routes/post/[id]/+page.svelte`

## License

This project is licensed under the MIT license.