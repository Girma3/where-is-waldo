import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { getUserByEmail, getUserById } from "../db/userQueries.js";

export const verifyUser = async (email, password, done) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return done(null, false, {
        message: "Incorrect user email",
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    verifyUser,
  ),
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default passport;
