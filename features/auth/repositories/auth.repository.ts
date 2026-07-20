import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { writeLog } from "@/lib/logger";

export async function findByUsername(username: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        username,
      },
    });
  } catch (error) {
    writeLog(error, "findByUsername");
    throw error;
  }
}

export async function findById(id: number) {
  try {
    return await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  } catch (error) {
    writeLog(error, "findById");
    throw error;
  }
}
