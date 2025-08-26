const groq = require("groq");
const BlocksToHtml = require("@sanity/block-content-to-html");
const { fetch, urlFor } = require("../../utils/sanity");
const path = require("path");

async function getAlbums() {
  const query = groq`*[_type=="album"] | order(releaseDate desc)`;
  const albums = await fetch(query, path.join(__dirname, "albums.cache.json"));
  const preparedAlbums = albums.map((album) => ({
    ...album,
    artwork: urlFor(album.artwork).url(),
    description: BlocksToHtml({ blocks: album.description }),
    tracks: album.tracks.map((track) => ({
      ...track,
      lyrics: track.lyrics ? BlocksToHtml({ blocks: track.lyrics }) : undefined,
    })),
  }));

  return preparedAlbums;
}

async function getCredits() {
  const query = groq`*[_type=="credit" && !(_id in path('drafts.**'))] | order(releaseDate desc)`;
  const credits = await fetch(
    query,
    path.join(__dirname, "credits.cache.json")
  );
  const preparedCredits = credits.map((credit) => ({
    ...credit,
    artwork: urlFor(credit.artwork).url(),
  }));

  return preparedCredits;
}

module.exports = async function getWorks() {
  const albums = await getAlbums();
  const credits = await getCredits();

  return { albums, credits };
};
