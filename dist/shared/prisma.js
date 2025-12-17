"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// ১. একদম শুরুতে এনভায়রনমেন্ট ভেরিয়েবল লোড করুন
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
const connectionString = process.env.DATABASE_URL;
// ২. চেক করুন ভ্যালু আসছে কি না
// console.log("DATABASE_URL Connection String:", connectionString);
// if (!connectionString) {
//   throw new Error("DATABASE_URL is not defined in .env file!");
// }
const pool = new pg_1.Pool({
    connectionString: connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 30000,
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({
    adapter: adapter,
    log: ["query", "error", "info", "warn"],
});
exports.default = prisma;
