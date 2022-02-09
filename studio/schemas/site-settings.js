import { FaNewspaper as icon } from "react-icons/fa";

export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon,
  fields: [
    {
      name: "featuredVideo",
      title: "Featured Video",
      description: "Shown on the home page",
      type: "url",
    },
    {
      name: "featuredVideoId",
      title: "YouTube ID of the feature video",
      description: "Shown on the home page",
      type: "string",
    },
    {
      name: "description",
      title: "Site description",
      type: "text",
      description:
        "The general description of the site. This will be shown in social media and search results",
    },
    {
      name: "socialImage",
      title: "Press Image",
      type: "image",
      description: "Shown in social media and search results",
    },
  ],
  preview: {
    select: {
      title: "Settings",
    },
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
};
