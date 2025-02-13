# react-zod-hook

A custom React hook for managing form state and validation with Zod.

## Installation

```bash
npm install react-zod-hook
```

## Usage for JavaScript (JS)

```javascript
import React from "react";
import { useForm } from "react-zod-hook";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
});

const MyForm = () => {
    const { data, onFormChange, validate, getError } = useForm({
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
            <input
                name="name"
                value={data.name}
                onChange={onFormChange}
            />
            {getError("name") && <p>{getError("name")}</p>}
            <input
                name="email"
                value={data.email}
                onChange={(e) => onChange("email", e.target.value)}
            />
            {getError("email") && <p>{getError("email")}</p>}
            <button type="button" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
};

export default MyForm;
```


## Usage for TypeScript (TS)

```typescript
import React from "react";
import { useForm } from "react-zod-hook";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
});

const MyForm: React.FC = () => {
    const { data, onChange, validate, getError } = useForm({
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
             <input
                name="name"
                value={data.name}
                onChange={onFormChange}
            />
            {getError("name") && <p>{getError("name")}</p>}
            <input
                name="email"
                value={data.email}
                onChange={(e) => onChange("email", e.target.value)}
            />
            {getError("email") && <p>{getError("email")}</p>}
            <button type="button" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
};

export default MyForm;
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
