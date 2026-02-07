import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import prismaGlobal from "../db/pool.js";
import { getUserByEmail, getUserById } from "../db/userQueries.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      (async () => {
        try {
          const user = await getUserByEmail(email);

          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      })();
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  (async () => {
    try {
      const user = await getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  })();
});

export default passport;
