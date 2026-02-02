import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import User from "./models/User.js";
import companyRoutes from "./routes/companyRoutes.js"
import jobRoutes from "./routes/jobRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { clerkMiddleware } from '@clerk/express'

// initialise express
const app = express();

// connect to db
await connectDB();
await connectCloudinary();

// middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

// routes
app.get('/', (req, res) => {
    res.send("API Working!")
})
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.post("/webhooks", express.raw({ type: "application/json" }), clerkWebhooks);
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

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