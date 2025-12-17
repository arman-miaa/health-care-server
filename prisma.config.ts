import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: "./prisma/schema",
  migrations: {
    path: "./prisma/schema/migrations",
    seed: "npx ts-node src/helpers/seed.ts",
  },
  datasource: {
    url: env('DATABASE_URL')
    // url: process.env.DATABASE_URL as string,
  },
});
