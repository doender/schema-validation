# Schema validation

This package exports a function that validates a JSON object against a schema:

```ts
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
```

Note: typically I would use a library like [zod](https://github.com/colinhacks/zod) for this

- Build: `npm run build`
- Run tests: `npm test`
- Run demo: `npm start`
