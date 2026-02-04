import dotenv from "dotenv";
dotenv.config();
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL environment variable");
}

const adapter = new PrismaPg({ connectionString });
const globalForPrisma = globalThis;

const prismaGlobal =
  globalForPrisma.prismaGlobal ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaGlobal = prismaGlobal;
}

async function connectToDatabase() {
  try {
    await prismaGlobal.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

//connectToDatabase();

export default prismaGlobal;
