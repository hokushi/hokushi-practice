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
  },
};
