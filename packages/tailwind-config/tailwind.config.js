module.exports = {
  content: [
    // Web app:
    `./app/**/*.{js,ts,jsx,tsx}`,
    `./components/**/*.{js,ts,jsx,tsx}`,
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
