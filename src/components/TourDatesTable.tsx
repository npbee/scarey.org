import { createResource, Suspense, Switch, Match, type JSX } from "solid-js";

const appId = import.meta.env.PUBLIC_BANDS_IN_TOWN_APP_ID;

type BandsInTownEvent = {
  offers: Array<{
    type: string;
    url: string;
    status: string;
  }>;
  venue: {
    name: string;
    city: string;
    region: string;
    country: string;
  };
  datetime: string;
  artist: {
    name: string;
    url: string;
    image_url: string;
    thumb_url: string;
    facebook_page_url: string;
    mbid: string;
    tracker_count: number;
    upcoming_event_count: number;
  };
  description: string;
  lineup: string[];
  id: string;
  title: string;
  artist_id: string;
  url: string;
};

type Event = {
  offers: Array<{ type: string; url: string }>;
  datetime: string;
  venue: {
    name: string;
    city: string;
    region?: string;
  };
  artist: {
    name: string;
  };
  url: string;
};

const localEvents: Event[] = [
  {
    offers: [],
    datetime: "2026-03-15T02:00:00Z",
    url: "https://www.simpletix.com/e/s-carey-courtney-hartman-tickets-257160",
    venue: {
      name: "Spirit of the Wilderness Church",
      city: "Grand Marais, Minnesota",
    },
    artist: {
      name: "S. Carey",
    },
  },
];

function fetchEvents(artist: string): Promise<Event[]> {
  return fetch(
    `https://rest.bandsintown.com/artists/${artist}/events?app_id=${appId}&date=upcoming`,
  )
    .then((res) => res.json())
    .then((data: BandsInTownEvent[]) => patchLocalEvents(artist, data));
}

function patchLocalEvents(artist: string, events: Event[]) {
  const now = new Date();
  const artistLocalEvents = localEvents.filter((e) => e.artist.name === artist);
  const filteredEvents = events.filter(
    (e) => !artistLocalEvents.some((le) => le.datetime === e.datetime),
  );
  return [...filteredEvents, ...artistLocalEvents].filter(
    (e) => new Date(e.datetime) > now,
  );
}

export default function TourDatesTable(props: { artist: string }) {
  const [events] = createResource(props.artist, fetchEvents);

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Match when={events.error}>
          <Err />
        </Match>
        <Match when={events() && events()!.length === 0}>
          <Empty />
        </Match>
        <Match when={events()}>
          <table class="w-full table-fixed">
            <thead class="hidden text-left text-3xl md:table-header-group">
              <tr>
                <Th>Date</Th>
                <Th>City</Th>
                <Th>Venue</Th>
              </tr>
            </thead>
            <tbody class="text-sm font-medium tracking-wide">
              {events()!.map((event) => {
                const row = buildRow(event);
                return (
                  <tr class="mb-8 block md:mb-0 md:table-row">
                    <Td label="Date">{row.date}</Td>
                    <Td label="City">{row.location}</Td>
                    <Td label="Venue">
                      <a
                        href={row.url}
                        class="hover:text-primary-700 underline decoration-2 underline-offset-4 transition-colors duration-100"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.venue}
                      </a>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Match>
      </Switch>
    </Suspense>
  );
}

function Th({ children }: { children: JSX.Element }) {
  return (
    <th class="font-brand border-b border-gray-400 text-left font-normal">
      {children}
    </th>
  );
}

function Td({ label, children }: { children: JSX.Element; label: string }) {
  return (
    <td
      data-label={label}
      class="flex py-2 before:mr-4 before:flex-1 before:content-[attr(data-label)] md:table-cell md:py-3 md:before:hidden"
    >
      {children}
    </td>
  );
}

function Loading() {
  return (
    <div class="flex w-full items-baseline justify-center">
      <div class="h-8 text-red-700">
        <svg
          width="55"
          height="100%"
          viewBox="0 0 55 80"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <g transform="matrix(1 0 0 -1 0 80)">
            <rect width="10" height="20" rx="3">
              <animate
                attributeName="height"
                begin="0s"
                dur="5.3s"
                values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="15" width="10" height="80" rx="3">
              <animate
                attributeName="height"
                begin="0s"
                dur="3s"
                values="80;55;33;5;75;23;73;33;12;14;60;80"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="30" width="10" height="50" rx="3">
              <animate
                attributeName="height"
                begin="0s"
                dur="1.6s"
                values="50;34;78;23;56;23;34;76;80;54;21;50"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="45" width="10" height="30" rx="3">
              <animate
                attributeName="height"
                begin="0s"
                dur="3s"
                values="30;45;13;80;56;72;45;76;34;23;67;30"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </rect>
          </g>
        </svg>
      </div>
      <p class="text-sm font-medium tracking-wider uppercase">Loading...</p>
    </div>
  );
}

function Err() {
  return (
    <div id="error" class="error">
      <div class="readable">
        <p class="p-4 text-base">
          There was an error loading the shows. Please try checking directly
          from Bandsintown:{" "}
          <a
            href="https://www.bandsintown.com/en/a/1022936-s.-carey"
            class="hover:text-primary-700 underline decoration-2 underline-offset-4 transition-colors duration-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.bandsintown.com/en/a/1022936-s.-carey
          </a>
        </p>
      </div>
    </div>
  );
}

function Empty() {
  return <div class="text-center italic">No shows at this time.</div>;
}

function buildRow(event: Event) {
  let date = formatDate(event.datetime);
  let location =
    event.venue.city + (event.venue.region ? ", " + event.venue.region : "");
  let venue = event.venue.name;
  let ticketOffer = event.offers.find(function (offer) {
    return offer.type === "Tickets";
  });
  let url = ticketOffer ? ticketOffer.url : event.url;

  return { date, location, venue, url };
}

function formatDate(datestamp: string) {
  let date = new Date(datestamp);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
