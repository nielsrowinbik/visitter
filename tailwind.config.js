/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-radix"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
