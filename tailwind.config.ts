import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        dark: "#1B1B1B",
        ligther: "#2B2B2B",
      }
    }
  },
  plugins: []
} as Config;