export type SchemaType = "string" | "number" | "boolean" | "object" | "array";

export type Schema = Record<string, SchemaType>;

export type InferType<T extends Schema> = {
  [K in keyof T]: T[K] extends "string"
    ? string
    : T[K] extends "number"
    ? number
    : T[K] extends "boolean"
    ? boolean
    : T[K] extends "object"
    ? object
    : T[K] extends "array"
    ? unknown[]
    : never;
};
