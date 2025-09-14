import "./config/instrument.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";

import { clerkWebhooks } from "./controller/webhooks.js";

// Initialize Express
const app = express();

// Connect to database
await connectDB();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => res.send("Api working"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post("/webhooks", clerkWebhooks);

// Sentry error handler should come **after all routes**
//app.use(Sentry.Handlers.errorHandler());

//port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
