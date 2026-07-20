import bcrypt from "bcrypt";
import type { LoginResult } from "../types/auth";
import { findByUsername } from "../repositories/auth.repository";
import { writeLog } from "@/lib/logger";
import { signToken } from "@/lib/jwt";

export async function loginAction(
  username: string,
  password: string,
): Promise<LoginResult> {
  try {
    const getActUser = await findByUsername(username);

    if (!getActUser) {
      return {
        success: false,
        message: "Username tidak ditemukan",
        data: null,
      };
    }

    const valid = await bcrypt.compare(password, getActUser.password);

    if (!valid) {
      return {
        success: false,
        message: "Password salah",
        data: null,
      };
    }

    const token = signToken({
      id: getActUser.id,
      username: getActUser.username,
    });

    return {
      success: true,
      message: "Selamat anda berhasil login",
      data: {
        id: getActUser.id,
        username: getActUser.username,
        email: getActUser.email,
        name: getActUser.name,
      },
      token: token,
    };
  } catch (error) {
    writeLog(error, "serviceLogAction");
    return {
      success: false,
      message: "Login gagal",
      data: null,
    };
  }
}
