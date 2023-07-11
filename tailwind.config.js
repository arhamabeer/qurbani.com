/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeBgPlaceholder: "rgba(120, 150, 145,0.7)",
        themeBg: "#3cb29c",
        themeBgDark: "#31695f",
      },
    },
  },
  plugins: [],
};
