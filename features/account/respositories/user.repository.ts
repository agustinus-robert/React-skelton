import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function getUser() {
  return prisma.user.findMany({
    where: {
      deleted_at: null,
    },
  });
}

async function getRoleFromUser(user_id: number) {
  const data = await prisma.userRole.findFirst({
    where: {
      user_id: user_id,
    },
  });

  return data;
}

export async function getUserId(id: number) {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
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

export async function storeUser(payload: any) {
  const { password: plainPassword, ...data } = payload;
  const hashedPassword = await bcrypt.hash(plainPassword, Number(10));

  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });

  return user;
}

export async function upsertUserRole(id: number, payload: any) {
  if ((await getRoleFromUser(id)) == null) {
    await prisma.userRole.create({
      data: {
        user_id: id,
        role_id: payload.role_id,
      },
    });
  } else {
    await prisma.userRole.deleteMany({
      where: {
        user_id: Number(id),
      },
    });

    await prisma.userRole.create({
      data: {
        user_id: Number(id),
        role_id: Number(payload.role_id),
      },
    });
  }
}

export async function updateUser(id: number, payload: any) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: payload,
  });
}

export async function deleteUser(id: number) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      deleted_at: new Date(),
    },
  });
}
