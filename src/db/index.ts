import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as dotenv from 'dotenv'; // 1. Eklendi

// 2. .env dosyasını oku
dotenv.config(); 

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is missing');
}

// prepare: false -> Serverless ortamlar için (Supabase Transaction Mode) gereklidir.
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });