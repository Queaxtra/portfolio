# Portfolio Website

This SvelteKit-based personal portfolio website is designed to effectively showcase your professional identity. Its extensible structure allows you to fully personalize your portfolio by adding new features or modifying the existing design.

## Setup and Installation

Install the dependencies:

```bash
bun install
```

Create a `.env` file in the project root:

```bash
GITHUB_TOKEN=your_github_token_here
```

The `GITHUB_TOKEN` value is required for the GitHub contributions graph. The app uses GitHub's GraphQL API on the server side to read the contribution calendar.

To create a token:

1. Open `https://github.com/settings/tokens`.
2. Click `Generate new token`.
3. Select `Generate new token (classic)`.
4. Add a note such as `portfolio contributions`.
5. Choose an expiration date.
6. For public contribution data, no extra scope is usually required. If you want private contributions included, enable `read:user`.
7. Click `Generate token` and copy the token.

Do not commit your `.env` file or expose your token publicly.

Run the project:

```bash
bun run dev
```

Visit `http://localhost:5173/` in your browser.

## License

This project is licensed under the MIT license.
