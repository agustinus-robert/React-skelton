import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { prisma } from "./prisma";

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
}

export async function getAuthPayload() {
  const token = await getToken();

  if (!token) return null;

  return verifyToken(token);
}

export async function getAuthUser() {
  const payload = await getAuthPayload();

  if (!payload) return null;

  return prisma.user.findUnique({
    where: {
      id: payload.id,
    },
    include: {
      userRole: {
        include: {
          role: {
            include: {
              userPermission: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
