import { createI18n } from "@svelte-i18n/core";
import { fallbackLocale, localeCookieName, locales, normalizeLocale } from "$lib/i18n";
import type { LayoutLoad } from "./$types";

interface NestedDictionary {
  [key: string]: string | NestedDictionary;
}

function flattenDictionary(dictionary: NestedDictionary, prefix = ""): Record<string, string> {
  return Object.entries(dictionary).reduce<Record<string, string>>((items, [key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      items[nextKey] = value;
      return items;
    }

    return {
      ...items,
      ...flattenDictionary(value, nextKey),
    };
  }, {});
}

export const load: LayoutLoad = async ({ data }) => {
  const i18n = await createI18n({
    locales: [...locales],
    locale: normalizeLocale(data.locale),
    fallbackLocale,
    cookieName: localeCookieName,
    dictionaries: {
      tr: async () => flattenDictionary((await import("$lib/translates/tr.json")).default),
      en: async () => flattenDictionary((await import("$lib/translates/en.json")).default),
    },
  });

  return {
    i18n,
  };
};
