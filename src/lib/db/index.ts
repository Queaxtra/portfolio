import PocketBase from "pocketbase";
import { env } from "$env/dynamic/private";

export interface ProjectRecord {
  id: string;
  name: string;
  description: string;
  url?: string;
  paused?: boolean;
}

export async function getProjects(page = 1, perPage = 10) {
  const pb = new PocketBase(env.VITE_APP_PBURL);
  const result = await pb.collection("projects").getList(page, perPage, {
    sort: "-created",
  });
  return {
    page: result.page,
    perPage: result.perPage,
    totalItems: result.totalItems,
    totalPages: result.totalPages,
    items: result.items.map((r: any) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.url,
      paused: r.paused,
    })),
  };
}


