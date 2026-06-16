import { getGitHubContributions } from "$lib/github/contributions.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  try {
    setHeaders({
      "cache-control": "no-store, max-age=0",
    });

    return {
      contributions: await getGitHubContributions(fetch),
      contributionsError: "",
    };
  } catch (error) {
    console.error("page github contributions load failed", {
      message: error instanceof Error ? error.message : "unknown error",
    });

    return {
      contributions: null,
      contributionsError:
        error instanceof Error
          ? error.message
          : "GitHub contributions could not be loaded",
    };
  }
};
