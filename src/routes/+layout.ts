import { normalizeLocale, setupI18n } from "$lib/i18n";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ data }) => {
  return {
    i18n: await setupI18n(normalizeLocale(data.locale)),
  };
};
