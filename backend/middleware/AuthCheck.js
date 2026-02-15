import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const AuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login First!",
    });
  }

  try {
    const DecodedToken = jwt.verify(token, process.env.JWT_SECRECT_KEY);
    req.user = DecodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default AuthMiddleware;
