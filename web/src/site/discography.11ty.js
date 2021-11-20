let html = String.raw;
let Icons = require("./js/icons");

module.exports = class Discography {
  data() {
    return {
      layout: "default",
      title: "Discography",
      description: "Albums, EP's, and other releases by S. Carey",
    };
  }

  Artwork(src) {
    return html`
      <img class="shadow-2xl rounded-sm w-full lazyload" data-src="${src}" />
    `;
  }

  mapLinks(links, joiner = " ") {
    return html`
      ${links
        .map((link) => {
          return html`
            <li class="flex">${this.Link(this.linkLabel(link), link.url)}</li>
          `;
        })
        .join(joiner)}
    `;
  }

  Links(links, cls, liCls) {
    return html`
      <ul class="flex gap-4 text-gray-800 text-sm md:text-xs ${cls}">
        ${links
          .map((link) => {
            return html`
              <li class="flex items-center md:justify-center ${liCls}">
                ${this.Link(this.linkLabel(link), link.url)}
              </li>
            `;
          })
          .join(" ")}
      </ul>
    `;
  }

  AlbumTitle(title) {
    return html`
      <h3 class="brand-font tracking-wide text-4xl font-light leading-none">
        ${title}
      </h3>
    `;
  }

  ReleaseDate(date, format) {
    return html`
      <p class="tracking-wider">${this.formattedDate(date, format)}</p>
    `;
  }

  Track(track) {
    return html`
      <li class="mb-1">
        <div class="expander">
          <h5>
            ${track.lyrics
              ? html`
                  <button aria-expanded="false">
                    ${track.title}
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 10 10"
                    >
                      <rect class="vert" height="8" width="2" y="1" x="4" />
                      <rect height="2" width="8" y="4" x="1" />
                    </svg>
                  </button>
                `
              : track.title}
          </h5>
          <div class="content" hidden>${track.lyrics}</div>
        </div>
      </li>
    `;
  }

  Album(album) {
    return html`
      <div class="flex flex-wrap gap-8">
        <div class="w-full md:w-64 space-y-4">
          ${this.Artwork(album.artwork)}
          <ul class="hidden md:grid gap-4 text-sm grid grid-cols-2">
            ${this.mapLinks(album.purchaseLinks || [])}
          </ul>
        </div>
        <div class="flex-1 space-y-8 md:space-y-6">
          <div class="space-y-2 md:space-y-0">
            ${this.AlbumTitle(album.title)}
            <div class="text-gray-300 text-sm font-normal">
              ${this.ReleaseDate(album.releaseDate, "LLLL d, y")}
            </div>
            <ul
              class="md:hidden flex gap-4 justify-between text-gray-300 font-medium text-sm"
            >
              ${this.mapLinks(album.purchaseLinks || [], " • ")}
            </ul>
          </div>

          <div class="max-w-prose">${album.description}</div>
          <div>
            <h4 class="text-2xl font-normal leading-relaxed mb-2">Tracks</h4>
            <ul class="text-sm">
              ${album.tracks.map((track) => this.Track(track)).join(" ")}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  Credit(credit) {
    return html`
      <figure
        aria-describedby="${credit._id}"
        class="relative credit"
        tabindex="0"
      >
        <div>${this.Artwork(credit.artwork)}</div>
        <figcaption
          id="${credit._id}"
          class="absolute top-0 w-full h-full bg-gray-900 p-3 rounded-sm flex flex-col space-y-8"
        >
          <div class="space-y-2 md:flex-1">
            <div>
              <h3
                class="text-2xl md:text-base font-medium text-gray-100 italic"
              >
                ${credit.title}
              </h3>
              <h4
                class="text-xl md:text-base tracking-wide text-gray-100 font-medium md:leading-tight"
              >
                ${credit.artist}
              </h4>

              <div class="text-gray-200 font-normal text-sm md:text-xs">
                ${this.ReleaseDate(credit.releaseDate, "y")}
              </div>
            </div>

            <hr class="w-2 text-gray-500" />

            <p class="md:text-sm italic text-gray-100">
              ${credit.credits.join(", ")}
            </p>
          </div>
          <ul
            class="text-gray-100 flex flex-col md:flex-row flex-wrap gap-4 md:gap-3 md:text-xs"
          >
            ${this.mapLinks(credit.purchaseLinks || [])}
          </ul>
        </figcaption>
      </figure>
    `;
  }

  render(data) {
    return html`
      ${this.Subheader("Discography", "Albums")}

      <div class="flex flex-col space-y-24">
        ${data.works.albums.map((album) => this.Album(album)).join(" ")}
        <div>
          ${this.Subheader("Discography", "Production & Performance")}
          <div
            class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6 mb-12"
          >
            ${data.works.credits.map((credit) => this.Credit(credit)).join(" ")}
          </div>
        </div>
      </div>
    `;
  }
};
