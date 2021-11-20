const html = String.raw;

const Icons = require("./js/icons");

module.exports = class Shows {
  data() {
    return {
      title: "Shows",
      layout: "default",
      description: "Upcoming live shows for S. Carey",
      js: "shows.js",
    };
  }

  render() {
    return html`
      <section class="mb-12" id="s-carey-root">
        ${this.Subheader("Shows", "S. Carey")}

        <div
          id="loading"
          class="loading hidden w-full flex items-center justify-center"
        >
          ${Icons.Loading()}
        </div>

        <div class="target"></div>

        <div id="error" class="error hidden">
          <div class="readable">
            <p class="text-base p-4">
              There was an error loading the shows. Please try checking directly
              from Bandsintown:
              ${this.Link(
                "Link",
                "https://www.bandsintown.com/en/a/1022936-s.-carey"
              )}
            </p>
          </div>
        </div>
      </section>

      <section id="bon-iver-root">
        ${this.Subheader("Shows", "Bon Iver")}

        <div class="loading hidden w-full flex items-center justify-center">
          ${Icons.Loading()}
        </div>

        <div class="target"></div>

        <div class="error hidden">
          <div class="readable">
            <p class="text-base p-4">
              There was an error loading the shows. Please try checking directly
              from Bandsintown:
              ${this.Link(
                "Link",
                "https://www.bandsintown.com/a/144274-bon-iver?"
              )}
            </p>
          </div>
        </div>
      </section>
    `;
  }
};
