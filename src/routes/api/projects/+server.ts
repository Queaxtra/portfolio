import { getProjects } from "$lib/db";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const page = Number(url.searchParams.get("page") ?? "1");
  const perPage = Number(url.searchParams.get("perPage") ?? "10");

  try {
    const result = await getProjects(page, perPage);
    return new Response(JSON.stringify(result), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("projects load failed", {
      message: error instanceof Error ? error.message : "unknown error",
    });
    return new Response(
      JSON.stringify({ items: [], totalItems: 0, totalPages: 0, page, perPage }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
};
