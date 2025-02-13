import React from "react";
import * as lib from "./lib";
import { ZodSchema } from "zod";

// Define the structure of the form state
interface FormState {
  data: { [key: string]: any };
  isLoading: boolean;
  error: lib.ValidationError[] | null;
}

// Define the structure of the useForm hook's return value
interface UseFormReturn {
  stateupdate: (key: string, value: any) => void;
  data: { [key: string]: any };
  setState: React.Dispatch<React.SetStateAction<FormState>>;
  onChange: (name: string, value: any) => void;
  onFormChange: (element: React.ChangeEvent<HTMLInputElement>) => void;
  validate: () => boolean;
  isLoading: boolean;
  error: lib.ValidationError[] | null;
  getError: (name: string) => string;
}

// Define the props for the useForm hook
interface UseFormProps {
  data?: { [key: string]: any };
  zodSchema: ZodSchema;
}

/**
 * A custom hook for managing form state and validation.
 * @param formData - The initial form data.
 * @param zodSchema - The Zod schema for validation.
 * @returns An object containing form state and utility functions.
 */
export default function useForm({
  data: formData = {},
  zodSchema,
}: UseFormProps): UseFormReturn {
  const [state, setState] = React.useState<FormState>({
    data: formData,
    isLoading: false,
    error: null,
  });

  // Memoized state updater
  const stateupdate = React.useCallback((key: string, value: any) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Memoized form state updater
  const updateFormState = React.useCallback((name: string, value: any) => {
    setState((prev) => ({
      ...prev,
      data: lib.setValueByPath(prev.data, name, value),
    }));
  }, []);

  // Memoized form change handler
  const onFormChange = React.useCallback(
    (element: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = element.target;
      updateFormState(name, value);
    },
    [updateFormState]
  );

  // Memoized validation function
  const validate = React.useCallback(() => {
    const errors = lib.setValidationErrorHandlers(zodSchema, state.data);
    stateupdate("error", errors);
    return errors.length === 0;
  }, [zodSchema, state.data, stateupdate]);

  // Memoized error getter
  const getError = React.useCallback(
    (name: string) => {
      return lib.getValidateError(state.error || [], name);
    },
    [state.error]
  );

  const { data, isLoading, error } = state;

  return {
    stateupdate,
    data,
    setState,
    onChange: updateFormState,
    onFormChange,
    validate,
    isLoading,
    error,
    getError,
  };
}