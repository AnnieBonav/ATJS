/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          900: "#FD8A5F",
          800: "#F08962"

        },
        "selected": "#B84A21",
        "hovered": "#E16E43",
        "background": "#FFFAF9"
      },
    }
  },
  plugins: [],
}