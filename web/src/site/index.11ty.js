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
        class="md:h-full flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:gap-8"
        style="--tw-bg-opacity: 0.5"
      >
        <div class="relative">
          <div
            class="absolute blur w-full h-full bg-gradient-to-r from-[#3f5e78] to-[#0c1f39] z-[-1] top-0 left-0 rounded-sm"
          ></div>
          <div class="md:pb-0 flex items-center md:flex-1">
            <img
              src="/img/shadowlands.jpeg"
              class="md:object-contain md:w-full md:max-w-xl rounded-sm"
            />
          </div>
        </div>
        <div
          class="flex items-center md:items-start justify-between md:justify-start flex-col gap-6"
        >
          <div
            class="flex items-baseline justify-center md:justify-start w-full gap-2 text-3xl md:text-4xl"
          >
            <h2
              class="brand-font font-light text-gray-300 flex flex-col text-center md:text-left"
            >
              <span class="uppercase italic" style="letter-spacing: 0.25em"
                >Shadowlands</span
              >
              <span class="text-xl tracking-wide">with John Raymond</span>
            </h2>
          </div>
          <a
            href="https://ingrv.es/shadowlands-f94-3"
            class="${this.buttonClass()}"
            target="_blank"
            rel="noreferrer nofollow noopener"
          >
            Preorder now
            <span class="flex w-5" style="transform: rotate(-45deg)">
              ${Icons.ArrowRight()}
            </span>
          </a>
        </div>
      </div>
    `;
  }
};
