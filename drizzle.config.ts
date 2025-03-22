import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/utils/schema.ts",
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_ERgMDCTHz7J0@ep-soft-morning-a5h1iny0-pooler.us-east-2.aws.neon.tech/mockup-interview?sslmode=require"
    }
});
