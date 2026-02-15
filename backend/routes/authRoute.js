import express from "express";
const authRouter = express.Router();
import passport from "../authentication/passportConfig.js";
import isUserAuth from "../authentication/isUserAuth.js";
authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ message: info?.message || "Login failed" });

    //  Attach user to session
    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Logged in", user });
    });
  })(req, res, next);
});

authRouter.post("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: "Logged out" });
  });
});
authRouter.get("/protected", isUserAuth);

export default authRouter;
