import { unlink, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { put, del } from "@vercel/blob";
import { ValidationError, DatabaseError } from "@/server/shared/errors";
import { env } from "@/server/shared/config/env";
import { uploadConfig } from "@/server/shared/config/upload";
import { logger } from "@/server/shared/logger";

export async function deleteStudentPhoto(
  photoPath: string | null | undefined
): Promise<void> {
  if (!photoPath) return;
  try {
    if (
      photoPath.startsWith("https://") &&
      photoPath.includes("blob.vercel-storage.com")
    ) {
      if (env.BLOB_READ_WRITE_TOKEN) {
        await del(photoPath, { token: env.BLOB_READ_WRITE_TOKEN });
        logger.info("Photo deleted from Vercel Blob:", photoPath);
      }
    } else if (photoPath.startsWith(uploadConfig.uploadUrlPrefix)) {
      const fullPath = join(process.cwd(), "public", photoPath);
      if (existsSync(fullPath)) {
        await unlink(fullPath);
        logger.info("Photo deleted from local storage:", photoPath);
      }
    }
  } catch (error) {
    logger.warn("Error deleting photo:", error);
  }
}

export async function saveStudentPhoto(
  base64Data: string,
  studentId: string,
  studentName: string,
  oldPhotoPath?: string | null
): Promise<string> {
  try {
    if (!base64Data.startsWith("data:image/")) {
      throw new ValidationError(
        "Invalid photo format. Expected base64 image data."
      );
    }
    const matches = base64Data.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) {
      throw new ValidationError("Invalid base64 photo format.");
    }
    const mimeType = matches[1].toLowerCase();
    const base64Content = matches[2];
    if (!uploadConfig.allowedMimeExtensions.includes(mimeType as "jpeg" | "jpg" | "png")) {
      throw new ValidationError(
        "Invalid file type. Only JPG, JPEG, and PNG are allowed."
      );
    }
    const buffer = Buffer.from(base64Content, "base64");
    if (buffer.length > uploadConfig.maxFileSizeBytes) {
      throw new ValidationError(
        `File size exceeds ${uploadConfig.maxFileSizeBytes / 1024}KB limit.`
      );
    }
    const timestamp = Date.now();
    const sanitizedName = studentName
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase()
      .substring(0, 50);
    const extension = mimeType === "jpeg" ? "jpg" : mimeType;
    const filename = `students/${studentId}_${timestamp}_${sanitizedName}.${extension}`;

    if (oldPhotoPath) {
      await deleteStudentPhoto(oldPhotoPath);
    }

    const isVercel = process.env.VERCEL === "1" || process.env.VERCEL_ENV;
    const useBlobStorage = isVercel || env.BLOB_READ_WRITE_TOKEN;

    if (useBlobStorage && env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(filename, buffer, {
          access: "public",
          contentType: `image/${mimeType}`,
          token: env.BLOB_READ_WRITE_TOKEN,
        });
        logger.info("Photo saved to Vercel Blob:", blob.url);
        return blob.url;
      } catch (blobError) {
        logger.warn("Error uploading to Vercel Blob, falling back to local:", blobError);
      }
    }

    if (!existsSync(uploadConfig.uploadDir)) {
      await mkdir(uploadConfig.uploadDir, { recursive: true });
    }
    const filepath = join(uploadConfig.uploadDir, filename.replace("students/", ""));
    await writeFile(filepath, buffer);
    logger.info("Photo saved to local storage:", filename);
    return `${uploadConfig.uploadUrlPrefix}${filename.replace("students/", "")}`;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw new DatabaseError("Failed to save photo", error);
  }
}
