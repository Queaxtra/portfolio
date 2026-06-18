import { localeCookieName, normalizeLocale } from "$lib/i18n";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const locale = normalizeLocale(event.cookies.get(localeCookieName));

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", locale),
  });
};
