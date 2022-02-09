let colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/site/**/*.{njk,md}",
    "./src/site/**/*.11ty.js",
    "./src/site/_includes/**/*.js",
    "./src/site/js/**/*.js",
    "./src/*.js",
    "./.eleventy.js",
  ],
  theme: {
    screens: {
      sm: "940px",
      md: "768px",
      lg: "1250px",
    },
    extend: {
      colors: {
        gray: colors.slate,
        primary: colors.red,
        secondary: colors.emerald,
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
