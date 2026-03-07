import { body, validationResult } from "express-validator";
import passport from "../authentication/passportConfig.js";
import { createUser, getUserByEmail } from "../db/userQueries.js";
const ValidateSignUp = [
  body("email").isEmail().withMessage("Please provide a valid email address."),
  body("name").notEmpty().withMessage("Name is required."),
];
const ValidateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email address."),
];
async function handleSignUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, name } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const newUser = await createUser(email, name);
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function handleLoginRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ message: info?.message || "Unauthorized" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.json({
        message: "Logged in successfully",
        user,
      });
    });
  })(req, res, next);
}
async function handleLogout(req, res) {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
}

export {
  handleSignUp,
  handleLoginRequest,
  handleLogout,
  ValidateSignUp,
  ValidateLogin,
};
