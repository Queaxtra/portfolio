import { json, type RequestHandler } from "@sveltejs/kit";
import { getGitHubContributions } from "$lib/github/contributions.server";

export const GET: RequestHandler = async ({ fetch, setHeaders }) => {
  try {
    setHeaders({
      "cache-control": "no-store, max-age=0",
    });

    const contributions = await getGitHubContributions(fetch);

    return json(contributions);
  } catch (error) {
    console.error("github contributions fetch failed", {
      message: error instanceof Error ? error.message : "unknown error",
    });

    return json(
      {
        message:
          error instanceof Error
            ? error.message
            : "GitHub contributions could not be loaded",
      },
      { status: 502 },
    );
  }
};
