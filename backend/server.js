import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnnectDB from "./db/db.js";
import router from "./routes/Auth/auth_routes.js";
import cookieParser from "cookie-parser";
import { router as AdminProductRouter } from "./routes/Admin/products.js";
import { router as UserProductRouter } from "./routes/User/UserProductRoute.js";
import { router as UserCartRouter } from "./routes/User/CartRouter.js";
import session from "express-session";
import passport from "./config/passport.js";
import googleAuth from "./routes/Auth/googleAuth.js";

dotenv.config();
ConnnectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Pragma",
      "Expires",
    ],
    maxAge: 86400,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Session and Passport MUST come BEFORE routes
app.use(
  session({
    secret: "googleauthsecret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("the backend is running"));

app.use("/api/auth", router);
app.use("/api/auth", googleAuth);
app.use("/api/admin/products", AdminProductRouter);
app.use("/api/user/products", UserProductRouter);
app.use("/api/user/cart", UserCartRouter);

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);
