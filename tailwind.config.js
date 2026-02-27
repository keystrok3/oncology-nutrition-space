/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: "#5F8D7E",
          light: "#7AA898",
          dark:  "#4A7163",
        },
        lavender: {
          DEFAULT: "#B8A8C9",
          light:   "#CFC3DC",
        },
        cream:   "#F8F9F7",
        neutral: "#EAEAEA",
        charcoal:"#2E2E2E",
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
      // Wider max-width for container-wide
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};