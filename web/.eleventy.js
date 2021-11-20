const { DateTime } = require("luxon");
const util = require("util");

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addLayoutAlias("default", "layouts/base.njk");
  eleventyConfig.addPassthroughCopy("src/site/img");
  eleventyConfig.addPassthroughCopy("src/site/favicons");

  // a debug utility
  eleventyConfig.addFilter("dump", obj => {
    return util.inspect(obj, {
      compact: false
    });
  });

  eleventyConfig.addFilter("linkLabel", link => {
    switch (link.type) {
      case "itunes":
        return "iTunes";
      case "physical":
        return "CD / LP";
      case "spotify":
        return "Spotify";
      case "amazon":
        return "Amazon";
      case "bandcamp":
        return "Bandcamp";
      case "indies":
        return "Indies";
      case "soundcloud":
        return "Soundcloud";
      default:
        throw new Error(`Unhandled link type ${link.type}`);
    }
  });

  eleventyConfig.addShortcode("debug", (obj, label) => {
    const layoutStyle = [
      "position: fixed",
      "bottom: 0; left: 0;",
      "width: 100%",
      "height: 50vh",
      "overflow-y: scroll",
      "font-size: 12px",
      "padding: 12px",
      "background: #eeeeee",
      "color: black",
      "font-weight: normal"
    ].join(";");
    return `<div style="${layoutStyle}">
      <p class="mb-4 uppercase font-semibold tracking-wide">${label}</p>
      <pre>${util.inspect(obj, {
        compact: false
      })}</pre></div>`;
  });

  eleventyConfig.addFilter("formattedDate", (dateStr = "LLLL d, y", format) => {
    return DateTime.fromJSDate(new Date(dateStr), {
      zone: "utc"
    }).toFormat(format);
  });

  // This is put here by PostCSS, we need 11ty to move to the `_site` directory
  // at root
  eleventyConfig.addPassthroughCopy({
    "src/site/css/built.css": "css/built.css"
  });

  eleventyConfig.addPassthroughCopy({
    "src/site/js/shows.js": "js/shows.js"
  });

  eleventyConfig.addWatchTarget("./src/site/js/");

  // Components
  eleventyConfig.addPairedShortcode("Link", function(content, href) {
    return `<a class="hover:text-red-700 transition-colors border-b-2 border-gray-700 hover:border-red-700 duration-100" href="${href}">${content}</a>`;
  });

  eleventyConfig.addPairedShortcode("BtnLink", function(
    content,
    href,
    extraClass = ""
  ) {
    const cls = [
      "inline-flex",
      "items-center",
      "justify-center",
      "px-6",
      "py-3",
      "border",
      "border-transparent",
      "text-base",
      "leading-6",
      "rounded-sm",
      "text-white",
      "bg-orange-600",
      "hover:bg-orange-500",
      "focus:outline-none",
      "focus:shadow-outline",
      "transition",
      "duration-150",
      "ease-in-out",
      "shadow-lg",
      "tracking-wide"
    ].join(" ");

    return `<a class="${cls} ${extraClass}" href="${href}">${content}</a>`;
  });

  eleventyConfig.addShortcode("CurrentYear", function() {
    return DateTime.fromJSDate(new Date(), {
      zone: "utc"
    }).toFormat("y");
  });

  eleventyConfig.addShortcode("Subheader", function(mainHeader, subHeader) {
    return `<div class="flex-wrap z-10 py-4 flex items-center font-normal mb-4 uppercase text-base">
  <h1 class="font-medium tracking-wider">${mainHeader}&thinsp;/&thinsp;</h1><h2 class="whitespace-no-wrap text-red-700 tracking-wider font-medium">${subHeader}</h2>
</div>`;
  });

  return {
    dir: {
      input: "src/site",
      output: "_site",
      htmlTemplateEngine: "njk",
      templateFormats: ["njk", "md"]
    },
    passthroughFileCopy: true
  };
};
