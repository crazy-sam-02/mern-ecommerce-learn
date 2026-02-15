import {
  RegisterUser,
  LoginUser,
  LogoutUser,
} from "../../controller/Auth/authController.js";
import express from "express";
import AuthMiddleware from "../../middleware/AuthCheck.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.get("/checkauth", AuthMiddleware, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    message: "Authenticated User!",
    user,
  });
});

export default router;
