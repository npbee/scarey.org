let html = String.raw;

module.exports = function (data) {
  const title = data.title ? `${data.title} - S. Carey` : "S. Carey";

  return html`<title>${title}</title>
    <meta name="description" content="{{ settings.description }}" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:title" content="S. Carey" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="{{ settings.description }}" />
    <meta property="og:url" content="https://scarey.org" />
    <meta property="og:image" content="{{ settings.socialImage }}" />
    <meta name="twitter:title" content="S. Carey" />
    <meta name="twitter:description" content="{{ settings.description }}" />
    <meta name="twitter:image" content="{{ settings.socialImage }}" />
    <meta name="twitter:card" content="summary_large_image" /> `;
};
