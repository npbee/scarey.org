import startCase from "lodash/startCase";
import { MdPerson as icon} from "react-icons/md";

export default {
  name: "contact",
  title: "Contact",
  type: "document",
  icon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: 'Please use "Firstname Lastname" format',
    },
    {
      name: "company",
      title: "Company",
      type: "string",
    },
    {
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Booking", value: "booking" },
          { title: "Licensing", value: "licensing" },
          { title: "Publicity", value: "publicity" },
          { title: "Management", value: "management" },
        ],
      },
    },
    {
      name: "region",
      title: "Region",
      type: "string",
      description: "E.g. 'US' or 'UK / EU'",
    },
    {
      name: "email",
      title: "Email Address",
      type: "string",
      validation: Rule => Rule.regex(/@/),
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
    },
  ],
  preview: {
    select: {
      name: "name",
      role: "role",
      region: "region",
    },
    prepare(selection) {
      const { role, name, region } = selection;

      return {
        title: name,
        subtitle: startCase(role),
        description: region,
      };
    },
  },
};
