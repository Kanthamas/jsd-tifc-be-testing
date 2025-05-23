import express from "express";

// import userRoutes from "./routes/userRoutes.js";
// import noteRoutes from "./routes/noteRoutes.js";

import { verifyToken } from "./middlewares/verifyToken.js";
import userRoutes from "./routes/userRoutes.mongo.js";
import noteRoutes from "./routes/noteRoutes.mongo.js";

import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();

app.use(express.json());

// Health check endpoint
app.get("/health-test", (req, res) => {
	res.json({ error: false, message: "OK" });
});

// users with TURSO_DB
// app.use("/api/v1/users", userRoutes);

// notes with TURSO_DB
// app.use("/api/v1/notes", noteRoutes);

// users with MongoDB
app.use("/api/v1/users", userRoutes);
// -> Register POST /auth/register ===> /api/v1/users/auth/register 
// ===> http://127.0.0.1:4100/api/v1/users/auth/register

// notes with MongoDB
app.use("/api/v1/notes", verifyToken, noteRoutes);

// not found middleware
app.use(notFound);

// error handler middleware
app.use(errorHandler);

export default app;
