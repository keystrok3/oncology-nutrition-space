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
          DEFAULT: "#4A7C3F",
          light:   "#6AA358",
          dark:    "#356030",
        },
        // Accent — logo blue (replaces lavender)
        blue: {
          DEFAULT: "#2E7DB5",
          light:   "#4A95C8",
          dark:    "#1F5F8E",
        },
        // Section tint — very light green derived from logo
        tint:    "#F0F7EE",
        // Pure white — primary background
        cream:   "#FFFFFF",
        // Neutral — borders, dividers
        neutral: "#EAEAEA",
        // Text — logo navy
        charcoal:"#1B2D5B",
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