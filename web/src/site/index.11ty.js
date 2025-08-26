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
      "border-gray-900",
      "font-medium",
      "rounded-full",
      "px-12 md:px-5",
      "text-lg",
      "tracking-wider",
      "shadow",
      "bg-white/70",
      "text-gray-900",
      "transform",
      "transition-all",
      "bg-gradient-to-r",
      "from-secondary-50",
      "from-secondary-100",
      "hover:bg-white/90",
      "active:bg-white/100",
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
        class="md:h-full flex flex-col md:items-center md:justify-between gap-8 md:gap-4"
        style="--tw-bg-opacity: 0.5"
      >
        <div class="aspect-w-16 aspect-h-9 md:pb-0 h-full w-full">
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
          class="flex md:flex-row items-center justify-between w-full flex-col gap-3"
        >
          <div
            class="flex items-baseline w-full text-center md:text-left justify-center md:justify-start gap-2 text-3xl md:text-4xl"
          >
            <h2 class="brand-font font-normal text-gray-100 flex flex-col">
              <span class="uppercase italic" style="letter-spacing: 0.25em"
                >Watercress</span
              >
              <span class="text-xl tracking-wide">October 3rd, 2025</span>
            </h2>
          </div>
          <a
            href="https://s-carey.lnk.to/watercress-ep"
            class="${this.buttonClass()}"
            target="_blank"
            rel="noreferrer nofollow noopener"
          >
            Pre-order
            <span class="flex w-5" style="transform: rotate(-45deg)">
              ${Icons.ArrowRight()}
            </span>
          </a>
        </div>
      </div>
    `;
  }
};
