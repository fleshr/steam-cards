const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { screens: { sm: "580px", lg: "960px" } },
    fontFamily: {
      sans: ["var(--inter-font)", ...fontFamily.sans],
    },
    backgroundImage: {
      placeholder:
        "linear-gradient(0deg, rgba(31, 41, 55, 0.5), rgba(31, 41, 55, 0.5)), linear-gradient(180deg, rgba(31, 41, 55, 0), #1F2937 92%)",
    },
  },
  plugins: [],
};
