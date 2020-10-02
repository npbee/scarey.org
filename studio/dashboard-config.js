export default {
  widgets: [
    {
      name: "project-info"
    },
    {
      name: "netlify",
      options: {
        title: "Netlify deploys",
        sites: [
          {
            title: "Site",
            apiId: process.env.SANITY_STUDIO_NETLIFY_API_ID,
            buildHookId: process.env.SANITY_STUDIO_NETLIFY_BUILD_HOOK_ID,
            name: "scarey"
          }
        ]
      }
    }
  ]
};
