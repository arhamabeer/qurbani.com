/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeBgPlaceholder: "rgba(168, 225, 215,0.6)",
        themeBg: "#3cb29c",
        themeBgDark: "#31695f",
      },
    },
  },
  plugins: [],
};
