export const getAllUserSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        users: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              email: { type: "string" },
              createdAt: { type: "string" },
              isAdmin: { type: "boolean" },
            },
          },
        },
        count: { type: "number" },
      },
    },
    500: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};

export const adminRegisterSchema = {
  body: {
    type: "object",
    required: ["isAdmin"],
    properties: {
      isAdmin: { type: "boolean" },
    },
  },
  response: {
    200: {
      type: "object",
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
    400: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};
