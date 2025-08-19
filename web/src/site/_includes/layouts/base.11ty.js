let html = String.raw;
let fs = require("fs");

let Meta = require("../meta");
let Favicon = require("../favicon");
let Icons = require("../icons");

let expanderJs = fs.readFileSync(__dirname + "/../expander.js").toString();
let creditFocusJs = fs
  .readFileSync(__dirname + "/../credit-focus.js")
  .toString();

module.exports = class Base {
  data() {
    return {};
  }
  render(data) {
    return html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          ${Meta(data)}
          <link rel="stylesheet" href="/css/built.css" />
          <link rel="canonical" href="https://scarey.org/" />

          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
            href="/fonts/roboto-condensed-v19-latin-300.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
            href="/fonts/roboto-condensed-v19-latin-300italic.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
            href="/fonts/roboto-condensed-v19-latin-regular.woff2"
          />

          ${Favicon(data)}
        </head>
        <body class="flex flex-col">
          <div class="bg">
            <picture>
              <source srcset="/img/water-cropped.jpg" type="image/jpeg" />
              <img src="/img/water.jpg" alt="Break Me Open album cover" />
            </picture>
          </div>
          ${data.variant !== "frameless" ? Header(data) : ""}
          <div class="container mx-auto p-4 flex-1">${data.content}</div>

          ${data.variant !== "frameless" ? Footer(data) : ""}

          <script src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.0/lazysizes.min.js"></script>
          ${data.js ? html` <script src="/js/${data.js}"></script> ` : ""}
          <script>
            ${expanderJs};
          </script>

          <script>
            ${creditFocusJs};
          </script>
        </body>
      </html>
    `;
  }
};

function Header(data) {
  return html`
    <header style="--tw-bg-opacity: 1" class="xbg-black/30 text-gray-100">
      <nav class="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <a href="/" class="transition-colors bg-clip-text hover:text-transparent bg-gradient-to-r from-secondary-50 to-secondary-500 w-full md:w-auto block py-3 md:py-6 text-center md:text-left brand-font text-4xl font-light italic uppercase tracking-wide hover:text-primary-700">
           S. Carey
         </a>
        <ul class="bg-black/40 rounded-full px-6 w-full md:w-auto flex justify-between md:justify-start space-x-6 uppercase tracking-widest text-xs">
           <li>${Link(data.page, "Discography", "/discography/")}</li>
           <li>${Link(data.page, "Shows", "/shows/")}</li>
           <li>
             ${Link(
               data.page,
               "Store",
               "https://merch.ambientinks.com/collections/scarey",
               "",
               true
             )}
           </li>
           <li>${Link(data.page, "Contact", "/contact/")}</li>
         </ul>

    </header>
  `;
}

let linkClass = ["block", "py-3", "md:py-3", "hover:text-primary-700"];

function Link(page, text, href, extraCls, blank) {
  let cls = [
    extraCls,
    ...linkClass,
    page.url === href ? "text-primary-500 font-medium" : "",
  ].join(" ");
  let attrs = [`class="${cls}"`, `href=${href}`];

  if (blank) {
    attrs.push(`target=_blank`, `rel="noreferrer nofollow noopener"`);
  }

  return html` <a ${attrs.join(" ")}>${text}</a> `;
}

let iconCls = ["flex", "px-2", "w-8", "md:mx-0"].join(" ");
let formAction =
  "//middlewestmgmt.us3.list-manage.com/subscribe/post?u=41155eea0059f0d47081cf8c3&amp;id=12eb6035f7";

function Footer(data) {
  let isHomePage = data.page.url === "/";

  return html`
    <footer class="py-4">
      <div
        class="container mx-auto flex text-gray-100 space-x-16 md:space-x-4 flex-row justify-between items-center px-4 w-full"
      >
        <a
          href="/"
          class="bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-secondary-50 to-secondary-500 brand-font text-base font-normal hover:text-primary-700 uppercase tracking-widest italic"
          >S. Carey</a
        >

        <div
          class="flex justify-between flex-1 md:flex-none items-center space-x-2 -ml-2"
        >
          <a
            href="http://facebook.com/scareymusic"
            target="_blank"
            class="flex items-center px-2 hover:text-gray-300"
          >
            <span class="sr-only">S. Carey Facebook</span>
            <span class="w-4 h-4 flex items-center"> ${Icons.Fb()} </span>
          </a>
          <a
            href="http://twitter.com/scareymusic"
            target="_blank"
            class="flex items-center px-2 hover:text-gray-300"
          >
            <span class="sr-only">S. Carey Twitter</span>
            <span class="w-4 h-4 flex items-center"> ${Icons.Twitter()} </span>
          </a>

          <a
            href="https://www.instagram.com/scareypics/"
            target="_blank"
            class="flex items-center px-2 hover:text-gray-300"
          >
            <span class="sr-only">S. Carey Instagram</span>
            <span class="w-4 h-4 flex items-center"> ${Icons.Ig()} </span>
          </a>
          <a
            href="${formAction}"
            target="_blank"
            rel="noreferrer noopener nofollow"
            class="px-2 items-center flex hover:text-gray-300"
          >
            <span class="sr-only">S. Carey Mailing List</span>
            <span class="w-5 h-5 flex items-center"> ${Icons.Email()} </span>
          </a>
        </div>
      </div>
    </footer>
  `;
}
