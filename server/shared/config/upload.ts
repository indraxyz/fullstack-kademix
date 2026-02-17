import { env } from "./env";
import { join } from "path";

const MAX_UPLOAD_SIZE_BYTES = (env.MAX_UPLOAD_SIZE_KB ?? 1024) * 1024;

export const uploadConfig = {
  maxFileSizeBytes: MAX_UPLOAD_SIZE_BYTES,
  allowedMimeTypes: ["image/jpeg", "image/jpg", "image/png"] as const,
  allowedMimeExtensions: ["jpeg", "jpg", "png"] as const,
  uploadDir: join(process.cwd(), "public", "uploads", "students"),
  uploadUrlPrefix: "/uploads/students/",
} as const;
