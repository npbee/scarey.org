const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: ["./src/site/**/*.{njk,md}"],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  whitelist: [
    "underline",
    "table",
    "thead",
    "tbody",
    "tr",
    "td",
    "th",
    "sticky",
    "credit",
    "text-orange",
    "italic",
    "text-gray",
    "text-center",
    "border"
  ],
  whitelistPatterns: [/border/, /text-orange-400/]
});

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production"
      ? [purgecss, require("cssnano")]
      : [])
  ]
};
