import { prisma } from "@/lib/prisma";
import { writeLog } from "@/lib//logger";

export function getRole() {
  return prisma.role.findMany();
}

export function permission() {
  return prisma.permission.findMany();
}

export function storeRole(data: any) {
  return prisma.role.create({
    data: data,
  });
}

export function getIdRole(id: number) {
  return prisma.role.findFirst({
    where: {
      id: id,
    },
  });
}

export function updateRole(id: number, data: any) {
  return prisma.role.update({
    where: {
      id: id,
    },
    data: data,
  });
}

export function rolePermission(id: number) {
  return prisma.rolePermission.findMany({
    where: {
      role_id: id,
    },
  });
}

export async function upsertRolePermission(id: number, payload: any) {
  await prisma.rolePermission.deleteMany({
    where: {
      role_id: id,
    },
  });

  await prisma.rolePermission.createMany({
    data: payload.map((item: any) => ({
      role_id: Number(id),
      permission_id: Number(item.permission_id),
      can_create: Boolean(item.can_create),
      can_read: Boolean(item.can_read),
      can_update: Boolean(item.can_update),
      can_delete: Boolean(item.can_delete),
    })),
  });
}

export function deleteRole(id: number) {
  return prisma.role.delete({
    where: { id: Number(id) },
  });
}
