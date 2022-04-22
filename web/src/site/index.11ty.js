const html = String.raw;

const Icons = require("./_includes/icons");

module.exports = class Home {
  data() {
    return {
      layout: "default",
      description: "Musician based in Eau Claire, WI.",
    };
  }

  buttonClass() {
    return [
      "inline-flex",
      "items-center",
      "gap-3",
      "border",
      "border-gray-700",
      "font-medium",
      "rounded-full",
      "px-12 md:px-5",
      "text-lg",
      "tracking-wider",
      "shadow",
      "bg-gradient-to-r from-indigo-900 to-secondary-800",
      "transform",
      "transition-all",
      "hover:from-primary-800",
      "active:from-primary-900",
      "h-12 md:h-10",
      "whitespace-nowrap",
    ].join(" ");
  }

  render(data) {
    let { featuredVideoId } = data.settings;
    let embedOptions = [
      "showinfo=0",
      "theme=dark",
      "showsearch=0",
      "modestbranding=1",
      "controls=0",
    ];
    let embedUrl = `https://www.youtube.com/embed/${featuredVideoId}?${embedOptions.join(
      "&"
    )}`;

    return html`
      <div
        class="md:h-full flex flex-col space-y-6"
        style="--tw-bg-opacity: 0.5"
      >
        <div
          class="aspect-w-16 aspect-h-9 md:pb-0 md:h-full"
          style="max-height: 40rem"
        >
          <iframe
            height="100%"
            width="100%"
            class=""
            src=${embedUrl}
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <div
          class="flex items-center justify-between flex-col md:flex-row gap-6"
        >
          <div
            class="flex items-baseline justify-center md:justify-start w-full gap-2 text-3xl md:text-4xl"
          >
            <h2
              class="brand-font font-light italic uppercase text-gray-300"
              style="letter-spacing: 0.25em"
            >
              Break Me Open
            </h2>
          </div>
          <a
            href="https://s-carey.ffm.to/break-me-open"
            class="${this.buttonClass()}"
            target="_blank"
            rel="noreferrer nofollow noopener"
          >
            Out now
            <span class="flex w-5" style="transform: rotate(-45deg)">
              ${Icons.ArrowRight()}
            </span>
          </a>
        </div>
      </div>
    `;
  }
};
