const groq = require("groq");
const { fetch, urlFor } = require("../../utils/sanity");
const path = require("path");

async function getSiteSettings() {
  const query = groq`*[_type=="siteSettings" && !(_id in path('drafts.**'))][0]`;
  const results = await fetch(
    query,
    path.join(__dirname, "settings.cache.json")
  );

  return {
    ...results,
    socialImage: urlFor(results.socialImage).url()
  };
}

module.exports = getSiteSettings;
