import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("connected to DB");
  } catch (error) {
    console.log("error while connecting to DB: " + error);
    new Error("error while connecting to DB");
  }
};

export default prisma;
