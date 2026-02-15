import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// STEP 1 → redirect to google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// STEP 2 → callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/auth/login",
  }),
  (req, res) => {
    const user = req.user;

    // create SAME JWT like manual login
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRECT_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // redirect frontend
    res.redirect(
      `http://localhost:5173/auth/login`
    );
  }
);

export default router;
