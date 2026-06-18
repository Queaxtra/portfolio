import { createContext } from "svelte";
import type { I18nContext } from "../routes/+layout.svelte";

export const localeCookieName = "fatihlive-lang";
export const locales = ["tr", "en"] as const;
export const fallbackLocale: Locale = "tr";

export type Locale = (typeof locales)[number];

const localeSet = new Set<string>(locales);

const [getContext, setContext] = createContext<I18nContext>();

export const useI18n = getContext;
export const createI18nContext = (i18n: () => I18nContext) => setContext(i18n());

export function normalizeLocale(locale: string | undefined | null): Locale {
  if (locale && localeSet.has(locale)) {
    return locale as Locale;
  }

  return fallbackLocale;
}
