import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { authenticate, authorize } from "../middleware/auth";

const router = Router();

const generateToken = (user: any) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};

// Step 1: Redirect to Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const user = req.user as any;
      if (!user) return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);

      const token = generateToken(user);

      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/google/callback?token=${token}`);
    } catch (err) {
      console.error(err);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
    }
  }
);

// Protected route
router.get("/me", authenticate, (req, res) => {
  res.json(req.user);
});

// Admin-only route
router.get("/admin", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome, admin!" });
});

export default router;
