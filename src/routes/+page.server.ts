import { getGitHubContributions } from "$lib/github/contributions.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({
    "cache-control": "no-store, max-age=0",
  });

  let contributions = null;
  let contributionsError = "";
  try {
    contributions = await getGitHubContributions(fetch);
  } catch (error) {
    console.error("page github contributions load failed", {
      message: error instanceof Error ? error.message : "unknown error",
    });
    contributionsError =
      error instanceof Error
        ? error.message
        : "GitHub contributions could not be loaded";
  }

  return {
    contributions,
    contributionsError,
  };
};