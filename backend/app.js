import dotenv from "dotenv";
dotenv.config({ path: "./db/prisma/.env" });

import express from "express";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import passport from "./authentication/passportConfig.js";
import prismaGlobal from "./db/pool.js";
import cors from "cors";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/usersRoute.js";
import gameRouter from "./routes/gameRoute.js";
import appApiInfo from "./controllers/appRouteInfo.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      secure: false,
      sameSite: "lax",
    },
    secret: "a santa at nasa",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prismaGlobal, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      // dbRecordIdIsUserId: true,
    }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", authRouter);

app.use("/api", userRouter);
app.use("/api", gameRouter);

app.listen(port, () => {
  console.log(`Server is running, link http://localhost:${port}`);
});

export default app;
