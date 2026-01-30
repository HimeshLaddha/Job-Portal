import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/db.js";
// import './config/instrument.js'
// import * as Sentry from "@sentry/node"
import { clerkWebhooks } from "./controllers/webhooks.js";
import User from "./models/User.js";

// initialise express
const app = express();

// connect to db
await connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send("API Working!")
})
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.post("/webhooks", express.raw({ type: "application/json" }), clerkWebhooks);

app.get("/test-db", async (req, res) => {
    try {
        const user = await User.create({
            _id: "test_123",
            name: "Test User",
            email: "test@example.com",
            image: "test.png",
        });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


// port
const PORT = process.env.PORT || 5000;

// Sentry.setupExpressErrorHandler(app);

app.listen(PORT, async () => {
    console.log(`Server is running on PORT : ${PORT}`)

    if (process.env.NODE_ENV === "production") {
        try {
            const Sentry = await import("@sentry/node");
            await import("./config/instrument.js");

            Sentry.setupExpressErrorHandler(app);
            console.log("Sentry initialized safely");
        } catch (err) {
            console.error("Sentry failed to initialize:", err.message);
        }
    }
})