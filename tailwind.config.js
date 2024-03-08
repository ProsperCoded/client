/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      borderRadius: {
        "2sm": "0.2rem",
      },
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        "primary-light": "var(--color-primary-light)",
        secondary: "var(--color-secondary)",
        "secondary-dark": "var(--color-secondary-dark)",
        "secondary-light": "var(--color-secondary-light)",
        neutral: "var(--color-neutral)",
        "neutral-dark": "var(--color-neutral-dark)",
        "neutral-light": "var(--color-neutral-light)",
      },
      fontFamily: {
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
      },
      backgroundImage: {
        "hero-image": "url('../static/hero-image.png')",
      },
    },
  },
  plugins: [],
};
