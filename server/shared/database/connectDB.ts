import mongoose from "mongoose";
import { env } from "../config/env";
import { isMongoConnectionError } from "../errors";

let isConnected = false;
let connectionPromise: Promise<typeof mongoose> | null = null;

const connectionOptions: mongoose.ConnectOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  bufferCommands: false,
  maxIdleTimeMS: 10000,
  retryWrites: true,
  retryReads: true,
  connectTimeoutMS: 30000,
};

let connectionHandlersRegistered = false;

const registerConnectionHandlers = () => {
  if (connectionHandlersRegistered) return;
  connectionHandlersRegistered = true;

  mongoose.connection.on("connected", () => {
    console.log("🎉 Connected to MongoDB successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
    isConnected = false;
    connectionPromise = null;
  });

  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB disconnected");
    isConnected = false;
    connectionPromise = null;
  });

  process.on("SIGINT", async () => {
    await disconnectDB();
    process.exit(0);
  });
};

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Connect to MongoDB database with retry logic for Atlas M0 clusters
 *
 * Typegoose models use the default Mongoose connection automatically.
 * All Typegoose models created with `getModelForClass()` will use this connection.
 *
 * @returns Promise resolving to the Mongoose instance
 */
export const connectDB = async (): Promise<typeof mongoose> => {
  try {
    if (isConnected && mongoose.connection.readyState === 1) {
      console.log("✅ Database already connected");
      return mongoose;
    }

    if (connectionPromise) {
      console.log("🔄 Connection in progress, waiting...");
      return connectionPromise;
    }

    connectionPromise = (async () => {
      try {
        const connection = await mongoose.connect(
          env.MONGODB_URI,
          connectionOptions
        );
        isConnected = true;
        connectionPromise = null;
        registerConnectionHandlers();
        console.log("✅ Typegoose models ready to use");
        return connection;
      } catch (error) {
        // Check if it's a connection error (likely Atlas cluster paused)
        if (isMongoConnectionError(error)) {
          console.warn(
            "⚠️ MongoDB connection failed. This might be due to Atlas M0 cluster being paused."
          );
          console.log("⏳ Waiting 20 seconds for cluster to wake up...");

          // Wait 20 seconds for Atlas cluster to wake up
          await wait(20000);

          console.log("🔄 Retrying connection...");

          try {
            const connection = await mongoose.connect(
              env.MONGODB_URI,
              connectionOptions
            );
            isConnected = true;
            connectionPromise = null;
            registerConnectionHandlers();
            console.log("✅ Connected to MongoDB after retry");
            return connection;
          } catch (retryError) {
            isConnected = false;
            connectionPromise = null;
            console.error(
              "❌ Database connection failed after retry:",
              retryError
            );
            throw retryError;
          }
        }

        // For other errors, throw immediately
        isConnected = false;
        connectionPromise = null;
        throw error;
      }
    })();

    return connectionPromise;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    isConnected = false;
    connectionPromise = null;
    throw error;
  }
};

export async function disconnectDB(): Promise<void> {
  try {
    if (isConnected && mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      isConnected = false;
      connectionPromise = null;
      console.log("🔌 Database disconnected successfully");
    } else {
      console.log("ℹ️ Database is not connected");
    }
  } catch (error) {
    console.error("❌ Error disconnecting from database:", error);
    throw error;
  }
}

export const isDBConnected = (): boolean => {
  return isConnected && mongoose.connection.readyState === 1;
};

/**
 * Get connection information
 * @returns Connection status and details
 */
export const getConnectionInfo = () => {
  return {
    isConnected: isConnected,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name,
  };
};

/**
 * Get the Mongoose connection instance
 * Useful for Typegoose models that need direct access to the connection
 * @returns The Mongoose connection instance
 */
export const getConnection = () => {
  return mongoose.connection;
};
