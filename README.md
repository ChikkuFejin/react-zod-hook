# React Zod Hook

A lightweight and flexible React hook for managing form state and validation using Zod.

## Features

- 🚀 **Easy to Use**: Simple API for managing form state and validation.
- 🔒 **Type-Safe**: Built with TypeScript for excellent type support.
- 🛠️ **Customizable**: Supports custom validation schemas using Zod.
- 📝 **Error Handling**: Provides detailed error messages for invalid fields.

## Installation

Install the library using npm:

```bash
npm install react-zod-hook
```

Or with yarn:

```bash
yarn add react-zod-hook
```

## Usage

### Basic Example

#### JavaScript

```javascript
import React from "react";
import { useForm } from "react-zod-hook";
import { z } from "zod";

// Define a Zod schema for validation
const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
});

const MyForm = () => {
    const { data, onChange, onFormChange, validate, getError } = useForm({
        data: { name: "", email: "" },
        zodSchema: schema,
    });

    const handleSubmit = () => {
        if (validate()) {
            console.log("Form is valid:", data);
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <form>
            <div>
                <label>Name:</label>
                <input
                    name="name"
                    value={data.name}
                    onChange={onFormChange}
                />
                {getError("name") && <p style={{ color: "red" }}>{getError("name")}</p>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    name="email"
                    value={data.email}
                    onChange={onFormChange}
                />
                {getError("email") && <p style={{ color: "red" }}>{getError("email")}</p>}
            </div>
            <button type="button" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
};

export default MyForm;
```

#### TypeScript

```typescript
import React from "react";
import { useForm } from "react-zod-hook";
import { z } from "zod";

// Define a Zod schema for validation
const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
});

const MyForm: React.FC = () => {
    const { data, onChange, onFormChange, validate, getError } = useForm({
        data: { name: "", email: "" },
        zodSchema: schema,
    });

    const handleSubmit = () => {
        if (validate()) {
            console.log("Form is valid:", data);
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <form>
            <div>
                <label>Name:</label>
                <input
                    name="name"
                    value={data.name}
                    onChange={onFormChange}
                />
                {getError("name") && <p style={{ color: "red" }}>{getError("name")}</p>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    name="email"
                    value={data.email}
                    onChange={onFormChange}
                />
                {getError("email") && <p style={{ color: "red" }}>{getError("email")}</p>}
            </div>
            <button type="button" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
};

export default MyForm;
```

## API Reference

### `useForm` Hook

#### Props

| Prop Name  | Type       | Description                                      |
|------------|------------|--------------------------------------------------|
| `data`     | `object`   | Initial form data (e.g., `{ name: "", email: "" }`). |
| `zodSchema`| `ZodSchema`| A Zod schema for validation (e.g., `z.object({ name: z.string() })`). |

#### Return Values

| Property      | Type                                             | Description                                                   |
|---------------|--------------------------------------------------|---------------------------------------------------------------|
| `data`        | `object`                                         | The current form data.                                        |
| `onChange`    | `(name: string, value: any) => void`             | Function to update a specific field in the form data.         |
| `onFormChange`| `(event: React.ChangeEvent<HTMLInputElement>) => void` | Function to handle input change events.                       |
| `validate`    | `() => boolean`                                  | Validates the form data against the Zod schema. Returns true if valid. |
| `getError`    | `(name: string) => string`                       | Returns the validation error message for a specific field.    |
| `isLoading`   | `boolean`                                        | Indicates if the form is in a loading state (useful for async operations). |
| `error`       | `ValidationError[] | null`                       | An array of validation errors or null if no errors.           |
| `stateupdate` | `(key: string, value: any) => void`              | Function to update the internal state (e.g., isLoading, error). |
| `setState`    | `React.Dispatch<React.SetStateAction<FormState>>`| Function to manually update the entire state.                 |

## Advanced Usage

### Manually Update State

You can use the `stateupdate` function to manually update the internal state (e.g., `isLoading`, `error`):

```javascript
const { stateupdate } = useForm({ data: {}, zodSchema: schema });

stateupdate("isLoading", true); // Set loading state
stateupdate("error", [{ for: "name", message: "Custom error" }]); // Set custom error
```

### Use `setState` for Full Control

You can use the `setState` function to manually update the entire state:

```javascript
const { setState } = useForm({ data: {}, zodSchema: schema });

setState((prev) => ({
    ...prev,
    isLoading: true,
    error: null,
}));
```

### Validation Error Structure

The `error` property contains an array of validation errors with the following structure:

```typescript
interface ValidationError {
    for: string; // Field name (e.g., "name", "email")
    message: string; // Error message (e.g., "Name is required")
}
```

### Example Schema

Here’s an example of a more complex Zod schema:

```typescript
const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    age: z.number().min(18, "You must be at least 18 years old"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT
