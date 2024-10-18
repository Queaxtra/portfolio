import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        cRed: "#FF6F61",
        cGray: "#5F5F5F",
        cLightGray: "#E6E6E6",
        cBlack: "#202020"
      }
    }
  },

  plugins: []
} as Config;
