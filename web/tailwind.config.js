module.exports = {
  purge: [
    "./src/site/**/*.{njk,md}",
    "./src/site/_includes/**/*.js",
    "./src/*.js",
    "./.eleventy.js"
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px"
    }
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
};
