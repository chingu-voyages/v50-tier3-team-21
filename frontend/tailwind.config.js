/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hippo': "url('./assets/hippo image.png')",
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
  plugins: [],
};
