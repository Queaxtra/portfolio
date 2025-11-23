import { browser } from '$app/environment';

export const setTheme = (theme: 'light' | 'dark') => {
  if (browser) {
    if (theme === "light") {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }

    if (theme === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }
}
