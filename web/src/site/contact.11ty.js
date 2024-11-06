let html = String.raw;

module.exports = class Contact {
  data() {
    return {
      layout: "default",
      title: "Contact",
      description: "Contact information for S. Carey"
    };
  }

  H2(text) {
    return html`<h2 class="brand-font text-4xl font-light">${text}</h2>`;
  }

  Person(person) {
    return html`
      <div>
        ${person.region
          ? html`<h3 class="text-lg text-gray-500 mb-1">${person.region}</h3>`
          : ""}
        <p class="flex text-xl font-normal">${person.name || ""}</p>
        <p class="text-gray-400">${person.company}</p>
        <a class="block hover:text-primary-700" href="mailto:${person.email}"
          >${person.email}</a
        >
      </div>
    `;
  }

  render(data) {
    return html`
      <div class="grid gap-8 md:gap-12">
        <div class="space-y-2">
          ${this.H2("Booking")}
          <div class="grid md:grid-cols-3 gap-12">
            ${data.contacts.booking
              .map(
                (person) => html` <div class="">${this.Person(person)}</div> `
              )
              .join(" ")}
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-12">

          <div class="space-y-2">
            ${this.H2("Management")} ${this.Person(data.contacts.management)}
          </div>
          <div class="space-y-2">
            ${this.H2("Licensing")} ${this.Person(data.contacts.licensing)}
          </div>
        </div>
      </div>
    `;
  }
};
