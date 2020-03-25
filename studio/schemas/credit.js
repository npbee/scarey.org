import icon from "react-icons/lib/md/album";

export default {
  name: "credit",
  title: "Credit",
  type: "document",
  icon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "artist",
      title: "Artist",
      type: "string"
    },
    {
      name: "artwork",
      title: "Artwork",
      type: "image"
    },
    {
      name: "releaseDate",
      title: "Release Date",
      type: "date"
    },
    {
      name: "credits",
      title: "Credits",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "purchaseLinks",
      title: "Purchase Links",
      type: "array",
      of: [
        {
          type: "purchaseLink"
        }
      ]
    }
  ],
  orderings: [
    {
      title: "Release Date, New",
      name: "releaseDateDesc",
      by: [{ field: "releaseDate", direction: "desc" }]
    }
  ],
  preview: {
    select: {
      title: "title",
      artist: "artist",
      releaseDate: "releaseDate",
      artwork: "artwork"
    },
    prepare(selection) {
      const { title, artwork, artist } = selection;
      const year = selection.releaseDate && selection.releaseDate.split("-")[0];

      return {
        title,
        subtitle: artist,
        description: year,
        media: artwork
      };
    }
  }
};
