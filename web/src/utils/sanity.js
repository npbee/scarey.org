require("dotenv").config();

const fs = require("fs");
const chalk = require("chalk");
const { promisify } = require("util");
const client = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const token = process.env.SANITY_TOKEN;

const sanityClient = client({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: !token,
  token,
});

module.exports = {
  fetch,
  urlFor,
};

async function fetch(queryString, cachePath) {
  if (cachePath) {
    try {
      const cached = await readFile(cachePath).then(JSON.parse);

      log("log", "Using cached data");

      return cached;
    } catch (err) {
      log("warn", "Couldn't read cache. Fetching from the network");

      const results = await sanityClient.fetch(queryString).catch(error => {
        log("error", "Error fetching from Sanity");
        log("error", error);
      });

      await writeFile(cachePath, JSON.stringify(results, null, 2));

      log("log", `Cache written to ${cachePath}`);

      return results;
    }
  }
}

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

function log(level, ...args) {
  const levelColor =
    {
      log: chalk.green,
      error: chalk.red,
      warn: chalk.yellow,
      default: chalk.grey,
    }[level] || levelColor.default;
  const date = chalk.white(`[${new Date().toISOString()}]`);
  const levelString = `[${levelColor(level)}]`;
  const str = chalk.blue(...args);
  const msg = `${chalk.bold.yellow(
    "SANITY CLIENT"
  )} :: ${levelString} ${date}: ${str}`;

  // eslint-disable-next-line
  console[level](msg);
}
