let html = String.raw;

exports.data = {
  layout: "default",
  title: "Bio",
  description: "Biographqy for S. Carey",
  variant: "frameless",
};

function Title() {
  let cls = [
    "bg-clip-text",
    "hover:text-transparent",
    "hover:bg-gradient-to-r",
    "from-indigo-500",
    "to-secondary-600",
    "italic",
    "uppercase",
    "tracking-widest",
    "brand-font",
    "font-light",

    "space-x-8",
    "text-2xl md:text-4xl",
    "group",
  ].join(" ");

  return html`
    <a href="/" class="${cls}">
      <span
        class="text-gray-400 hover:text-transparent group-hover:text-transparent"
        >S. Carey
      </span>
      <span> Break Me Open </span>
    </a>
  `;
}

exports.render = function () {
  return html`
    <div class="fixed inset-0 bg-neutral-900/75" style="z-index: -1"></div>
    <div class="space-y-12 max-w-prose mx-auto pb-8 pt-8">
      ${Title()}

      <div
        class="text-gray-300 font-normal break-words space-y-8 md:space-y-4 max-w-prose text-base md:leading-relaxed text-lg leading-8"
      >
        <p>
          In October, I spent a few days out in Montana with a couple close
          friends working on a cabin. The last day we were there, we finished
          early and went to the trout stream two miles down the road for some
          fly fishing. It became one of those afternoons where everything fell
          into place. Autumn’s air was brisk but warm enough to take the gloves
          off. Between casts, we zoned out in the bluebird skies with drifting
          clouds overhead. It took some doing, but we eventually figured out
          what the trout were eating. Laughs and hi-fives were plentiful, but
          also the continuous drone of the current was contemplative. It had
          been over a year since my marriage fell apart, nine months since my
          dad passed; I was a different person in a way. I sat on the bank of
          the freestone river and was overwhelmed with two words: gratitude and
          generosity. I ruminated on those words for a while, continuing to move
          forward, vowing to stay present and vulnerable. At dusk, the crescent
          moon peered out above the mountains, and the stars that night, I’ll
          never forget.
        </p>

        <p>Change is good. Fucking hard, but good.</p>

        <p>
          For many, to say the last two years have been difficult would be an
          understatement. Stress and uncertainty about life in general, family,
          friends, kids, even Mother Earth has grown exponentially. There is a
          heaviness to human consciousness right now, a darkness at the surface.
          As a songwriter, I get to channel these feelings into songs. In Break
          Me Open, I confronted darkness, I wrote about fear, I looked at love
          from different angles, I left it all out on the field. These past
          couple years have been the hardest of my life: full of grief, loss,
          and change. I feel like I had two choices. I could run from life, turn
          away, grow cold, resort to drugs, run and keep running. Or, I could
          give myself a deep look within. I could dig deep where the pain lives,
          where fear is festering, to try shed a new skin and come back a better
          person.
        </p>

        <p>Everyone is so far from perfect.</p>

        <p>
          This is not a “divorce” album. And while going through that has shook
          me to my core, leaving me at times, wondering who I am, and where to
          go, this record is bigger. It’s about love -past, present, and future.
          It’s about fatherhood -the overwhelming feeling of deep love for my
          kids and the melancholy of watching them grow up right before my eyes.
          It’s about accepting my faults and wrongdoings, exposing myself, and
          trying to know myself better than I did the day before. But above the
          darkness, it’s a message of hope, honesty, and growth. It’s a call to
          be vulnerable:
        </p>

        <p><em>Break Me Open.</em></p>
      </div>
      <div class="text-gray-400 fw-normal">${this.Link("scarey.org", "/")}</div>
    </div>
  `;
};
