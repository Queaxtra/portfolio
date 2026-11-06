import { createI18n } from "@svelte-i18n/core";
import { createContext } from "svelte";

export const localeCookieName = "fatihlive-lang";
export const locales = ["tr", "en"] as const;
export const fallbackLocale: Locale = "tr";

export type Locale = (typeof locales)[number];

const localeSet = new Set<string>(locales);

export function normalizeLocale(locale: string | undefined | null): Locale {
  if (locale && localeSet.has(locale)) {
    return locale as Locale;
  }

  return fallbackLocale;
}

interface NestedDictionary {
  [key: string]: string | NestedDictionary;
}

function flattenDictionary(dictionary: NestedDictionary, prefix = ""): Record<string, string> {
  return Object.fromEntries(
    Object.entries(dictionary).flatMap(([key, value]) =>
      typeof value === "string"
        ? [[prefix + key, value]]
        : Object.entries(flattenDictionary(value, `${prefix}${key}.`)),
    ),
  );
}

export async function setupI18n(locale: Locale) {
  return createI18n({
    locales: [...locales],
    locale,
    fallbackLocale,
    cookieName: localeCookieName,
    dictionaries: {
      tr: async () => flattenDictionary((await import("$lib/translates/tr.json")).default),
      en: async () => flattenDictionary((await import("$lib/translates/en.json")).default),
    },
  });
}

export type I18nContext = Awaited<ReturnType<typeof setupI18n>>;

const [getContext, setContext] = createContext<I18nContext>();

export const useI18n = getContext;
export const createI18nContext = (i18n: () => I18nContext) => setContext(i18n());
