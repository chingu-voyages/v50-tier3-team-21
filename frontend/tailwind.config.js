/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#49CC76",
        secondary: "#8C63EE",
        dark: "#291E43",
        danger: "#F70000",
      },
    },
  },
  plugins: [],
};
