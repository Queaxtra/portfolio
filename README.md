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

Blog posts are automatically added to the site through HackMD API integration. To display blog posts you create in your own HackMD account on your portfolio, simply replace the username field in the `src/routes/api/posts/fetch/all/+server.ts` file with your HackMD username. If you don't have a HackMD account yet, you can sign up for free [here](https://hackmd.io/). Alternatively, if you do not wish to use the blog feature, you can remove the `src/components/Posts.svelte`, `src/routes/api/posts/fetch/all/+server.ts`, and `src/routes/posts/+page.svelte` files from the project.

## License

This project is licensed under the MIT license.