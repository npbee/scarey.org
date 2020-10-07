const groq = require("groq");
const { fetch } = require("../../utils/sanity");
const path = require("path");

module.exports = async function getContacts() {
  const query = groq`*[_type=="contact" && !(_id in path('drafts.**'))]`;
  const contacts = await fetch(
    query,
    path.join(__dirname, "contacts.cache.json")
  );

  return {
    booking: contacts.filter(contact => contact.role === "booking"),
    publicity: contacts.filter(contact => contact.role === "publicity"),
    management: contacts.find(contact => contact.role === "management"),
    licensing: contacts.find(contact => contact.role === "licensing")
  };
};
