import { findById } from "../repositories/auth.repository";
import { verifyToken } from "@/lib/jwt";

export async function meUser(token: string) {
  const payload = verifyToken(token) as {
    id: number;
    username: string;
  };

  const user = await findById(payload.id);
  if (!user) {
    return {
      success: false,
      message: "User tidak ditemukan",
      data: null,
    };
  }

  return {
    success: true,
    message: "User ditemukan",
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
    },
  };
}
