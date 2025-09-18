export const config = {
  port: parseInt(process.env.PORT || "3002"),
  host: process.env.HOST || "0.0.0.0",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  saltRounds: parseInt(process.env.SALT_ROUNDS || "10"),
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001"
    ]
  }
};