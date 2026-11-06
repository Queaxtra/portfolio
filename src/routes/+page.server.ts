import { getGitHubContributions } from "$lib/github/contributions.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  setHeaders({ "cache-control": "no-store, max-age=0" });

  try {
    return { contributions: await getGitHubContributions(fetch), contributionsError: "" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "GitHub contributions could not be loaded";
    console.error("page github contributions load failed", { message });
    return { contributions: null, contributionsError: message };
  }
};
