import { validate } from "./validate";

describe("Validate function", () => {
  it("should return the input when the input matches the schema", () => {
    const barSchema = {
      name: "string",
      address: "string",
      drinks: "object",
    } as const;
    const barObj = {
      name: "Jimmys drinks",
      address: "Somewhere over the rainbow",
      drinks: {
        beer: ["Straffe Hendrik", "Rochefort", "St Bernard"],
      },
    };
    expect(validate(barSchema, barObj)).toEqual(barObj);
  });

  it("should throw an error when a property with target type object is an array", () => {
    const barSchema = {
      name: "string",
      address: "string",
      drinks: "object",
    } as const;
    const barObj = {
      name: "Sjonnies",
      address: "Centrum 001",
      drinks: [
        // < No object
        "Heineken",
      ],
    };
    expect(() => validate(barSchema, barObj)).toThrowError(
      expect.objectContaining({
        messages: [
          `Expected object for property 'drinks', got input: ["Heineken"]`,
        ],
      })
    );
  });

  it("should return the input when the input matches the schema", () => {
    const carSchema = {
      brand: "string",
      type: "string",
      milage: "number",
      extras: "array",
    } as const;
    const carObj = {
      brand: "Mazda",
      type: "MX5 NB 1.8",
      milage: 199999.99,
      extras: ["2001 Special Edition"],
    };
    expect(validate(carSchema, carObj)).toEqual(carObj);
  });

  it("should throw an error when a property with target type number is a string", () => {
    const carSchema = {
      brand: "string",
      type: "string",
      milage: "number",
      extras: "array",
    } as const;
    const carObjF = {
      brand: "BMW",
      type: "335",
      milage: "100000", // < No number
      extras: ["LCI", "KW Coilovers"],
    };
    expect(() => validate(carSchema, carObjF)).toThrowError(
      expect.objectContaining({
        messages: [
          `Expected number for property 'milage', got input: "100000"`,
        ],
      })
    );
  });

  it("should return the input when the input matches the schema", () => {
    const personSchema = {
      name: "string",
      age: "number",
      siblings: "array",
      metaData: "object",
      active: "boolean",
    } as const;
    const personObj = {
      name: "James",
      age: 25,
      siblings: ["Johnnathan"],
      metaData: {},
      active: true,
    };
    expect(validate(personSchema, personObj)).toEqual(personObj);
  });

  it("should throw errors when the input is missing properties", () => {
    const personSchema = {
      name: "string",
      age: "number",
      siblings: "array",
      metaData: "object",
      active: "boolean",
    } as const;
    const personObjF = {
      name: "James",
      age: 25,
      active: true,
    };
    expect(() => validate(personSchema, personObjF)).toThrowError(
      expect.objectContaining({
        messages: [
          "Expected array for property 'siblings', got input: undefined",
          "Expected object for property 'metaData', got input: undefined",
        ],
      })
    );
  });
});
