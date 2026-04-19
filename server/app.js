import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Admin } from "./models/Admin.js";
import { Booking } from "./models/Booking.js";
import {
  getSeedAdmin,
  hashPassword,
  signAdminToken,
  verifyAdminToken,
} from "./utils/adminAuth.js";
import {
  getRecommendationExplanation,
  getTopRecommendations,
} from "./utils/recommendationEngine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = Number(process.env.PORT ?? 5000);
const MONGODB_URI = process.env.MONGODB_URI?.trim();

function getMongoConnectionHint(uri) {
  if (!uri) {
    return "Create a .env file in the project root and set MONGODB_URI before starting the server.";
  }

  if (uri.includes("127.0.0.1:27017") || uri.includes("localhost:27017")) {
    return "The app is configured for a local MongoDB instance. Start MongoDB locally or update MONGODB_URI in .env to a reachable database.";
  }

  return "Verify that MONGODB_URI in .env points to a reachable MongoDB deployment and that your network/IP is allowed by the cluster.";
}

app.use(cors());
app.use(express.json({ limit: "10mb" }));

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const payload = verifyAdminToken(token);

  if (!payload) {
    return res.status(401).json({ message: "Admin authentication required." });
  }

  req.admin = payload;
  next();
}

function validateRecommendationPayload(body) {
  const { name, eventType, hairLength, image } = body;

  if (!name || !eventType || !hairLength || !image) {
    return "Name, event type, hair length, and image are required.";
  }

  return null;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/admin/login", async (req, res) => {
  try {
    const email = String(req.body.email ?? "").trim().toLowerCase();
    const password = String(req.body.password ?? "");

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email });

    if (!admin || admin.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ message: "Invalid admin credentials." });
    }

    return res.json({
      token: signAdminToken(admin),
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to login.",
    });
  }
});

app.post("/api/recommendations", (req, res) => {
  const validationError = validateRecommendationPayload(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const { name, eventType, hairLength, image } = req.body;
  const { recommendedHairstyle, alternatives } = getTopRecommendations({
    eventType,
    hairLength,
    image,
  });

  return res.json({
    customer: {
      name,
      eventType,
      hairLength,
      image,
    },
    recommendedHairstyle,
    alternatives,
    explanation: getRecommendationExplanation(
      { eventType, hairLength },
      recommendedHairstyle,
    ),
  });
});

app.post("/api/bookings", async (req, res) => {
  try {
    const validationError = validateRecommendationPayload(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { recommendedHairstyle } = req.body;

    if (!recommendedHairstyle?.id || !recommendedHairstyle?.name) {
      return res
        .status(400)
        .json({ message: "A recommendation must be selected before booking." });
    }

    const booking = await Booking.create({
      name: req.body.name,
      eventType: req.body.eventType,
      hairLength: req.body.hairLength,
      image: req.body.image,
      recommendedHairstyle: {
        hairstyleId: recommendedHairstyle.id,
        name: recommendedHairstyle.name,
        description: recommendedHairstyle.description,
        image: recommendedHairstyle.image,
        matchScore: recommendedHairstyle.matchScore,
        tags: recommendedHairstyle.tags,
      },
      status: "Pending",
    });

    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to create booking.",
    });
  }
});

app.get("/api/bookings", requireAdmin, async (_req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to load bookings.",
    });
  }
});

app.patch("/api/bookings/:id/status", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid booking status." });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    return res.json(booking);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to update booking.",
    });
  }
});

app.delete("/api/bookings/:id", requireAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to delete booking.",
    });
  }
});

async function startServer() {
  try {
    if (!MONGODB_URI) {
      throw new Error(getMongoConnectionHint(MONGODB_URI));
    }

    await mongoose.connect(MONGODB_URI);
    await Admin.findOneAndUpdate(
      { email: getSeedAdmin().email },
      getSeedAdmin(),
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    console.error(getMongoConnectionHint(MONGODB_URI));
    process.exit(1);
  }
}

startServer();
