import { env } from "./config/env";

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const;
const currentLevel = LEVELS[env.LOG_LEVEL];

function shouldLog(level: keyof typeof LEVELS): boolean {
  return LEVELS[level] >= currentLevel;
}

export const logger = {
  debug: (...args: unknown[]) => {
    if (shouldLog("debug")) console.log("[debug]", ...args);
  },
  info: (...args: unknown[]) => {
    if (shouldLog("info")) console.log("[info]", ...args);
  },
  warn: (...args: unknown[]) => {
    if (shouldLog("warn")) console.warn("[warn]", ...args);
  },
  error: (...args: unknown[]) => {
    if (shouldLog("error")) console.error("[error]", ...args);
  },
};
