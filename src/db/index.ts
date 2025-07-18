import 'dotenv/config';
import { drizzle } from "drizzle-orm/neon-http";

// in documentation its given 
// import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(process.env.DATABASE_URL!);
