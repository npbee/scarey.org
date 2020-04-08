const albums = [
  {
    title: "Hundred Acres",
    releaseDate: "2018-02-23",
    type: "album",
    description: `<p>At its heart, Hundred Acres - the third full-length from Wisconsin singer/songwriter S. Carey - finds him grounded and confident, writing the strongest songs of his career. More direct than ever, there is a wellspring of confidence in this new batch of songs that allow for ideas to remain uncomplicated while laying bare the intricacies of life.</p><br/>

  <p>Written in between touring schedules and the growth of his family, Carey produced Hundred Acres at April Base in Fall Creek, WI with support from his regular crew and contributions from the likes of Rob Moose (yMusic), Casey Foubert (Sufjan Stevens) and Sophie Payten (Gordi). He employed a smaller, more focused scale of instrumentation than on his previous albums while writing mostly on guitar instead of his go-to piano. Using more traditional song structures instead of the Steve Reich-ian repetitions of his past work, a new balance is struck that creates something unique. The result is a collection of poetic yet clear-eyed songs that both stand brightly on their own and tightly weave together to create a powerful album.</p>`,
    tracks: [
      {
        title: "Rose Petals",
      },
      {
        title: "Hideout",
      },
      {
        title: "Yellowstone",
      },
      {
        title: "True North",
      },
      {
        title: "Emery",
      },
      {
        title: "Hundred Acres",
      },
      {
        title: "More I See",
      },
      {
        title: "Fool's Gold",
      },
      {
        title: "Have You Stopped To Notice",
      },
      {
        title: "Meadow Song",
      },
    ],
    links: [
      {
        type: "itunes",
        href:
          "https://itunes.apple.com/us/album/more-i-see/1312887488?i=1312888565&app=itunes",
      },
      {
        type: "physical",
        href: "http://scarey.org/store/",
      },
      {
        type: "spotify",
        href: "https://open.spotify.com/album/7J2oRTfH14BbakDbmqMgiM",
      },
      {
        type: "amazon",
        href:
          "https://www.amazon.com/Hundred-Acres-S-Carey/dp/B0773W3FN8/ref=sr_1_1?ie=UTF8&qid=1520357994&sr=8-1&keywords=s.+carey+hundred+acres",
      },
    ],
    artwork: "/img/hundred-acres-front--small.jpg",
  },
  {
    title: "Supermoon EP",
    releaseDate: "2015-02-17",
    type: "album",
    artwork: "/img/supermoon-front--small.jpeg",
    links: [
      {
        type: "itunes",
        href: "https://itunes.apple.com/us/album/supermoon-ep/947062340",
      },
      {
        type: "physical",
        href:
          "https://merch.ambientinks.com/collections/scarey/products/supermoon-ep#",
      },
      {
        type: "spotify",
        href: "https://open.spotify.com/album/2qxHbPkJbXIGlC940RWehf",
      },
      {
        type: "amazon",
        href: "https://www.amazon.com/Supermoon-S-Carey/dp/B00QW82ZIE",
      },
    ],
    description:
      "Recorded primarily during the perigee-syzygy (also known as the super moon) of August 2014, the Supermoon EP from S. Carey is a study in scale, space, and proximity. These songs are a new and closer look into existing works from both S. Carey's renowned full-lengths, 2010's All We Grow and 2014's Range of Light. With Supermoon, Carey has broken these songs down to their essential, acoustic parts with his forever humming vocals laid over top, lilting yet percussive piano, and a subtle swath of harmonic strings. You can hear Carey's breath between words and the pat of his fingers on the keys; you can hear the living room in which his family's baby grand piano sits. These songs are beautiful, intimate and so potently personal. This collection is a stark presentation of S. Carey laid bare, an open invitation for the listener to climb into his world.",
    tracks: [
      {
        title: "Fire-scene (alt. version)",
      },
      {
        title: "We Fell (alt. version)",
      },
      {
        title: "Supermoon",
      },
    ],
  },
];

const credits = [
  {
    title: "Freeway",
    artist: "Pieta Brown",
    releaseDate: "2019-09-20",
    type: "production",
    artwork: "/img/pieta-brown-freeway.jpg",
    credits: ["Production", "Performance"],
    links: [
      {
        type: "itunes",
        href:
          "https://itunes.apple.com/us/album/more-i-see/1312887488?i=1312888565&app=itunes",
      },
      {
        type: "physical",
        href: "http://scarey.org/store/",
      },
    ],
  },
  {
    title: "Dig",
    artist: "Luray",
    releaseDate: "2019-07-26",
    type: "production",
    artwork: "/img/luray-dig.jpg",
    credits: ["Production", "Performance"],
    links: [
      {
        type: "itunes",
        href:
          "https://itunes.apple.com/us/album/more-i-see/1312887488?i=1312888565&app=itunes",
      },
      {
        type: "physical",
        href: "http://scarey.org/store/",
      },
    ],
  },
  {
    title: "The King of Whys",
    artist: "Owen",
    releaseDate: "2016-07-29",
    type: "production",
    artwork: "/img/owen-the-king-of-whys.jpg",
    credits: ["Production", "Performance"],
    links: [
      {
        type: "itunes",
        href:
          "https://itunes.apple.com/us/album/more-i-see/1312887488?i=1312888565&app=itunes",
      },
      {
        type: "physical",
        href: "http://scarey.org/store/",
      },
    ],
  },
  {
    title: "The Wilder",
    artist: "Luray",
    releaseDate: "2013-08-27",
    type: "production",
    artwork: "/img/luray-the-wilder.jpg",
    credits: ["Production", "Performance"],
    links: [
      {
        type: "itunes",
        href:
          "https://itunes.apple.com/us/album/more-i-see/1312887488?i=1312888565&app=itunes",
      },
      {
        type: "physical",
        href: "http://scarey.org/store/",
      },
    ],
  },
];

module.exports = {
  albums,
  production: credits,
};
