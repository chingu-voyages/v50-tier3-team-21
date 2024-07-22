import { addDynamicIconSelectors } from "@iconify/tailwind";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hippo: "url('./assets/hippo image.png')",
        logo: "url('./assets/logo.svg')",
        notFoundPage: "url('./assets/404.png')",
        menuExpand: "url('./assets/menu-expand.png')",
      },
      colors: {
        primary: "#49CC76",
        secondary: "#8C63EE",
        dark: "#291E43",
        danger: "#F70000",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
};
