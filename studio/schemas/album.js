import icon from "react-icons/lib/md/album";

export default {
  name: "album",
  title: "Album",
  type: "document",
  icon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "releaseDate",
      title: "Release Date",
      type: "date"
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent"
    },
    {
      name: "tracks",
      title: "Tracks",
      type: "array",
      of: [{ type: "track" }]
    },
    {
      name: "artwork",
      title: "Artwork",
      type: "image"
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
  preview: {
    select: {
      title: "title",
      releaseDate: "releaseDate",
      artwork: "artwork"
    },
    prepare(selection) {
      const { title, artwork, artist } = selection;
      const year = selection.releaseDate && selection.releaseDate.split("-")[0];

      return {
        title,
        subtitle: year,
        media: artwork
      };
    }
  },
  orderings: [
    {
      title: "Release Date, New",
      name: "releaseDateDesc",
      by: [{ field: "releaseDate", direction: "desc" }]
    }
  ]
};
