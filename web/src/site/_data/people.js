const people = [
  {
    role: "booking",
    region: "US / CAN",
    name: "Andrew Morgan",
    company: "Ground Control Touring",
    email: "andrew@groundcontroltouring.com",
    phone: "718-218-8203",
  },
  {
    role: "booking",
    region: "UK / EU",
    name: "Tom Taaffe",
    company: "Paradigm Agency",
    email: "tom.taaffe@paradigmagency.com",
    phone: "+ 44 7341 730 906",
  },
  {
    role: "publicity",
    region: "US",
    name: "Libby Webster",
    company: "Jagjaguwar",
    email: "libby@secretlygroup.com",
    phone: "812.822.3614",
  },
  {
    role: "publicity",
    region: "UK / EU",
    name: "Tom Davies",
    company: "Jagjaguwar",
    email: "tom@secretlygroup.com",
    phone: "+44 (0) 203.475.3297",
  },
  {
    role: "management",
    name: "Molly Beahen",
    company: "Middle West",
    email: "scarey@middlewestmgmt.com",
    phone: "612.270.9698",
  },
  {
    role: "licensing",
    name: "Jon Coombs",
    company: "Jagjaguwar",
    email: "jcoombs@jagjaguwar.com",
    phone: "812.822.3612",
  },
];

module.exports = {
  booking: people.filter(p => p.role === "booking"),
  publicity: people.filter(p => p.role === "publicity"),
  management: people.find(p => p.role === "management"),
  licensing: people.find(p => p.role === "licensing"),
};
