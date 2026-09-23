/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — logo dark green
        sage: {
          DEFAULT: "#557A4D",
          light:   "#769A6A",
          dark:    "#3E6138",
        },
        // Accent — logo blue (replaces lavender)
        blue: {
          DEFAULT: "#477A99",
          light:   "#6995AD",
          dark:    "#365F78",
        },
        // Section tint — very light green derived from logo
        tint:    "#F3F6F1",
        // Pure white — primary background
        cream:   "#FBFAF7",
        // Neutral — borders, dividers
        neutral: "#EAEAEA",
        // Text — logo navy
        charcoal:"#273548",
      },
      fontFamily: {
        heading: ["Playfair Display", "Georgia", "serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
}
