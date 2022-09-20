import { ValidationError } from "./errors";
import { InferType, Schema, SchemaType } from "./types";

/**
 * Map of schema types to their corresponding validator functions
 */
const validators: Record<SchemaType, (value: unknown) => boolean> = {
  string: (value: unknown): value is string => typeof value === "string",
  number: (value: unknown): value is number => typeof value === "number",
  boolean: (value: unknown): value is boolean => typeof value === "boolean",
  object: (value: unknown): value is object =>
    typeof value === "object" && !Array.isArray(value),
  array: (value: unknown): value is unknown[] => Array.isArray(value),
};

const createErrorMsg = (prop: string, targetType: SchemaType, input: unknown) =>
  `Expected ${targetType} for property '${prop}', got input: ${JSON.stringify(
    input
  )}`;

/**
 *
 * Validates the input against the schema and returns the input if it matches the schema.
 * Otherwise it throws a ValidationError.
 *
 * @param schema The schema to validate against
 * @param input The input to validate
 * @returns the input if it matches the schema
 */
export const validate = <T extends Schema>(
  schema: T,
  input: Record<string, unknown>
): InferType<T> => {
  const errors: string[] = [];
  for (const [prop, targetType] of Object.entries(schema)) {
    const hasValidType = validators[targetType];
    if (!hasValidType) {
      throw new Error(`No type check function for type: '${targetType}'`);
    }
    const inputVal = input[prop];
    if (!hasValidType(inputVal)) {
      const error = createErrorMsg(prop, targetType, inputVal);
      errors.push(error);
    }
  }
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  return input as InferType<T>;
};
