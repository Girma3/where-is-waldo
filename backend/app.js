import express from "express";
import expressSession from "express-session";
import prismaGlobal from "./db/pool.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import passport from "./authentication/passportConfig.js";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/usersRoute.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   // Set the Access-Control-Allow-Origin header
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prismaGlobal, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  return res.status(200).json("Welcome to the Where's Waldo API!");
});
// app.post("/login", passport.authenticate("local"), (req, res) => {
//   res.json({ message: "Logged in", user: req.user });
// });

// app.post("/logout", (req, res) => {
//   req.logout(() => {
//     res.json({ message: "Logged out" });
//   });
// });

app.use("/api", authRouter);
app.use("/api", userRouter);

// app.listen(port, () => {
//   console.log(`Server is running, link http://localhost:${port}`);
// });

export default app;
