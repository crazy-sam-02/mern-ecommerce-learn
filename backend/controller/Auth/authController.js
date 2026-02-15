import bcrypt from "bcrypt";
import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const RegisterUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "please Enter All the Fields",
        success: false,
      });
    }
    const ExistingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (ExistingUser) {
      console.log("the user already exist !");
      return res.status(409).json({
        message: "The User Already Exist",
        success:false
      });
    }
    const salt = await bcrypt.genSalt(10);
    const HashPassword = await bcrypt.hash(password, salt);

    const NewUser = new User({
      username,
      email,
      role: req.body.role || "user",
      password: HashPassword,
    });

    const SavedUser = await NewUser.save();

    return res.status(201).json({
      message: "New User is Created Successfully",
      success: true,
      user: {
        id: SavedUser._id,
        username: SavedUser.username,
        email: SavedUser.email,
        role: SavedUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "there is Error While Registering User",
      success: false,
    });
  }
};

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please Enter All The Fields",
        success: false,
      });
    }
    const ExistingUser = await User.findOne({ email });
    if (!ExistingUser) {
      return res.status(404).json({
        message: "The User Does Not Exist",
        success: false,
      });
    }
    const ComparePass = await bcrypt.compare(password, ExistingUser.password);
    if (!ComparePass) {
      return res.status(401).json({
        message: "Password is Incorrect",
        success: false,
      });
    }
    const Token = jwt.sign(
      {
        id: ExistingUser._id,
        username: ExistingUser.username,
        email: ExistingUser.email,
        role: ExistingUser.role,
      },
      process.env.JWT_SECRECT_KEY,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", Token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "The user Is Logged in Successfully",
      success: true,
      token: Token,
      user: {
        id: ExistingUser._id,
        username: ExistingUser.username,
        email: ExistingUser.email,
        role: ExistingUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " There is Error Occured While Login ",
      success: false,
    });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "There is Error ocurred while Logout",
    });
  }
};
