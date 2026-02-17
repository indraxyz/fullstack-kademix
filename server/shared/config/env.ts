import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  LOG_LEVEL: z
    .enum(["debug", "info", "warn", "error"])
    .default("info"),
  MAX_UPLOAD_SIZE_KB: z.coerce.number().int().min(1).max(10240).optional(),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  try {
    return envSchema.parse({
      MONGODB_URI: process.env.MONGODB_URI,
      NODE_ENV: process.env.NODE_ENV,
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
      LOG_LEVEL: process.env.LOG_LEVEL,
      MAX_UPLOAD_SIZE_KB: process.env.MAX_UPLOAD_SIZE_KB,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join("\n");
      throw new Error(
        `❌ Invalid environment variables:\n${missingVars}\n\nPlease check your .env file.`
      );
    }
    throw error;
  }
}

export const env = validateEnv();
