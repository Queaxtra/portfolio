import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        "qLightGray": "#FBFBFB",
        "qGray": "#F7F7F7",
        "qPurple": "#8000ff",
        "qDarkBlack": "#1F1F1F",
        "qDarkGray": "#272727"
      }
    }
  },

  plugins: []
} as Config;
