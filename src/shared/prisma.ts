import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";

// ১. একদম শুরুতে এনভায়রনমেন্ট ভেরিয়েবল লোড করুন
dotenv.config({ path: path.join(process.cwd(), ".env") });

const connectionString = process.env.DATABASE_URL;

// ২. চেক করুন ভ্যালু আসছে কি না
// console.log("DATABASE_URL Connection String:", connectionString);

// if (!connectionString) {
//   throw new Error("DATABASE_URL is not defined in .env file!");
// }

const pool = new Pool({
  connectionString: connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter: adapter as any,
  log: ["query", "error", "info", "warn"],
});

export default prisma;
