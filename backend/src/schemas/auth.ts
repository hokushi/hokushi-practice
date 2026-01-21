export const registerSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password", "isAdmin"],
    properties: {
      name: { type: "string", minLength: 1 },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 8 },
      isAdmin: { type: "boolean" },
    },
  },
};

export const loginSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 1 },
    },
  },
  response: {
    200: {
      properties: {
        message: { type: "string" },
        user: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            email: { type: "string" },
            isAdmin: { type: "boolean" },
          },
        },
      },
    },
  },
};
