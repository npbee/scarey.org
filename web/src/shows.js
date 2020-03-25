import { el, text, mount } from "redom";

var APPID = __BANDS_IN_TOWN_ID__;

const config = {
  scarey: {
    root: "s-carey-root"
  }
};

// Elements
let Loading = el("p", text("loading..."));

fetchEvents("s-carey-root", "S Carey");
fetchEvents("bon-iver-root", "Bon Iver");

function fetchEvents(elementId, key) {
  let root = document.getElementById(elementId);
  let $loading = root.querySelector(".loading");
  let $target = root.querySelector(".target");
  let $error = root.querySelector(".error");

  let loadingTimeout;

  function setLoading() {
    loadingTimeout = setTimeout(() => {
      $loading.classList.remove("hidden");
    }, 200);
  }

  function unsetLoading() {
    clearTimeout(loadingTimeout);
    $loading.classList.add("hidden");
  }

  function setError() {
    $error.classList.remove("hidden");
  }

  function handleResult(data) {
    unsetLoading();
    if (data && data.length === 0) {
      mount($target, buildEmpty());
    } else {
      let table = buildTable(data);
      mount($target, table);
    }
  }

  function handleError(err) {
    unsetLoading();
    setError();
    console.error(err);
  }

  setLoading();

  getData(key).then(handleResult, handleError);
}

function getData(artist) {
  let url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${APPID}&date=upcoming`;

  return fetch(url, {
    headers: {
      Accept: "application/json, text/javascript"
    }
  }).then(response => {
    if (response.ok) return response.json();

    throw new Error("Error fetching data from Bandsintown");
  });
}

function buildTable(events) {
  let rows = events.map(buildRow);
  let thead = el(
    "thead",
    el("tr", [el("th", "Date"), el("th", "City"), el("th", "Venue")])
  );
  let table = el("table.table", [thead, el("tbody", rows)]);

  return table;
}

function buildEmpty() {
  return el(
    "div.readable.italic.p-4.text-center.text-gray-300",
    "No shows at this time."
  );
}

function buildRow(event) {
  let date = formatDate(event.datetime);
  let location =
    event.venue.city + (event.venue.region ? ", " + event.venue.region : "");
  let venue = event.venue.name;

  let link = el(
    "a",
    { href: event.url, target: "_blank", rel: "noopener noopener nofollow" },
    venue
  );

  // data-label's are used for headings on small screens
  return el("tr", [
    el("td", { "data-label": "Date" }, date),
    el("td", { "data-label": "Location" }, location),
    el("td", { "data-label": "Venue" }, link)
  ]);
}

function formatDate(datestamp) {
  let date = new Date(datestamp);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}
