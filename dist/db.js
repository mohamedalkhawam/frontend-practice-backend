import 'dotenv/config';
import { PrismaClient } from './generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    // eslint-disable-next-line no-console
    console.error('DATABASE_URL is not set. Check your .env for local or Vercel env vars in production.');
}
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
// Light connection check on cold start; logs to help diagnose deployments
// Avoids throwing to keep serverless boot resilient
// eslint-disable-next-line no-console
prisma.$queryRaw `SELECT 1`.then(() => console.log('Database connected')).catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Database connection failed', err);
});
