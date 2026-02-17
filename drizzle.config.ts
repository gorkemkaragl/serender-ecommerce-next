import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// .env dosyasını oku
dotenv.config();

export default defineConfig({
  schema: './src/db/schema.ts', // Şema dosyamızın yeri
  out: './drizzle',             // Migration dosyalarının çıkacağı yer
  dialect: 'postgresql',        // Veritabanı türü
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});