import { z, ZodSchema } from "zod";

// Define the structure of a validation error
export interface ValidationError {
  for: string;
  message: string;
}

// Define the structure of the state object
interface FormState {
  [key: string]: any;
}

/**
 * Validates the form state against a Zod schema and returns validation errors.
 * @param schema - The Zod schema to validate against.
 * @param state - The form state to validate.
 * @returns An array of validation errors.
 */
export function setValidationErrorHandlers(
  schema: ZodSchema,
  state: FormState
): ValidationError[] {
  const response = schema.safeParse({
    ...state,
    marks: state?.marks ? Number(state?.marks) : "",
  });

  if (!response.success) {
    return response.error.errors.map((err) => ({
      for: String(err.path[0]),
      message: err.message,
    }));
  }

  return [];
}

/**
 * Reads a value from an object using a dot-separated path.
 * @param data - The object to read from.
 * @param path - The dot-separated path to the value.
 * @returns The value at the specified path or an empty string if not found.
 */
export function readValueByPath(data: FormState, path: string): any {
  const keys = path.split(".");
  let obj = data;
  for (let i = 0; i < keys.length; i++) {
    obj = obj?.[keys[i]] || "";
  }
  return obj;
}

/**
 * Retrieves the validation error message for a specific field.
 * @param errors - An array of validation errors.
 * @param name - The name of the field to get the error for.
 * @returns The error message or an empty string if no error is found.
 */
export function getValidateError(
  errors: ValidationError[] = [],
  name: string = ""
): string {
  return errors.find((error) => error.for === name)?.message || "";
}

/**
 * Sets a value in an object using a dot-separated path.
 * @param formData - The object to update.
 * @param path - The dot-separated path to the value.
 * @param value - The value to set.
 * @returns A new object with the updated value.
 */
export function setValueByPath(
  formData: FormState,
  path: string,
  value: any
): FormState {
  const keys = path.split(".");
  const data = { ...formData }; // Create a shallow copy to avoid mutating the original state
  let obj = data;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!obj[key]) {
      obj[key] = {};
    }
    obj = obj[key];
  }

  obj[keys[keys.length - 1]] = value;
  return data;
}