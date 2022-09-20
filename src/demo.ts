import { validate } from "./lib/validate";

const result = validate(
  {
    name: "string",
    age: "number",
    siblings: "array",
    metaData: "object",
    active: "boolean",
  },
  {
    name: "James",
    age: 25,
    siblings: ["Johnnathan"],
    metaData: {},
    active: true,
  }
);
console.log(result);
