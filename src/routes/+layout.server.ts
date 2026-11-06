import { localeCookieName, normalizeLocale } from "$lib/i18n";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => ({
  locale: normalizeLocale(cookies.get(localeCookieName)),
});
