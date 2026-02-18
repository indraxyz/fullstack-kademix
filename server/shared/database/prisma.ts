import { PrismaClient } from "@prisma/client";
import { logger } from "@/server/shared/logger";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function connectPrisma(): Promise<PrismaClient> {
  try {
    await prisma.$connect();
    logger.info("✅ Prisma connected to MongoDB");
    return prisma;
  } catch (error) {
    logger.error("❌ Prisma connection failed:", error);
    throw error;
  }
}

export async function disconnectPrisma(): Promise<void> {
  try {
    await prisma.$disconnect();
    logger.info("🔌 Prisma disconnected");
  } catch (error) {
    logger.error("❌ Prisma disconnect error:", error);
    throw error;
  }
}
