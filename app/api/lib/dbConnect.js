import mongoose from "mongoose";

const MONGODB_URI =
  process.env.NODE_ENV === "development"
    ? "mongodb://127.0.0.1:27017/mosque-around-me"
    : process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
async function dbConnect() {
  try {
    mongoose.connect(MONGODB_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("connected to MongoDB successfully");
    });
  } catch (error) {
    console.log("Failed to connect to MongoDB" + error);
    process.exit("0");
  }
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: true,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// const dbConnect = () => {
//   if (mongoose.connection.readyState >= 1) return;
//   mongoose.connect(MONGODB_URI);
// };
export default dbConnect;
