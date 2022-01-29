import { MdAttachMoney as icon } from "react-icons/md";

export default {
  name: "purchaseLink",
  title: "Purchase Link",
  type: "object",
  icon,
  fields: [
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "iTunes", value: "itunes" },
          { title: "Bandcamp", value: "bandcamp" },
          { title: "Physical", value: "physical" },
          { title: "Spotify", value: "spotify" },
          { title: "Amazon", value: "amazon" },
          { title: "Soundcloud", value: "soundcloud" },
          { title: "Indies", value: "indies" },
          { title: "Apple Music", value: "apple-music" },
        ],
      },
    },
    {
      name: "url",
      title: "URL",
      type: "url",
    },
  ],
};
