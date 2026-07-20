import "dotenv/config";
import { PrismaClient } from "@/generated/client/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import roles from "./role.json" with { type: "json" };
import permissions from "./permission.json" with { type: "json" };
import user_role from "./user_role.json" with { type: "json" };
import role_permissions from "./role_permissions.json" with { type: "json" };
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function seedUser(tx: any) {
  const password = await bcrypt.hash("password", 10);
  return tx.user.upsert({
    where: {
      email: "admin@dev.com",
    },
    update: {},
    create: {
      name: "Administrator",
      email: "admin@dev.com",
      username: "administrator",
      password,
    },
  });
}

async function seedRole(tx: any) {
  for (const roleData of roles) {
    await tx.role.create({
      data: {
        name: roleData.name,
      },
    });
  }
}

async function seedPermission(tx: any) {
  for (const permissionData of permissions) {
    await tx.permission.create({
      data: {
        name: permissionData.name,
      },
    });
  }
}

async function seedRolePermission(tx: any) {
  for (const rolePermissionData of role_permissions) {
    await tx.rolePermission.create({
      data: {
        role_id: rolePermissionData.role_id,
        permission_id: rolePermissionData.permission_id,
        can_create: rolePermissionData.can_create,
        can_read: rolePermissionData.can_read,
        can_update: rolePermissionData.can_update,
        can_delete: rolePermissionData.can_delete,
      },
    });
  }
}

async function seedUserRole(tx: any) {
  for (const userRoleData of user_role) {
    await tx.userRole.create({
      data: {
        user_id: userRoleData.user_id,
        role_id: userRoleData.role_id,
      },
    });
  }
}

async function main() {
  await prisma.$transaction(
    async (tx) => {
      await seedUser(tx);
      await seedRole(tx);
      await seedPermission(tx);
      await seedRolePermission(tx);
      await seedUserRole(tx);
    },
    {
      timeout: 30000,
    },
  );

  console.log("transaksi telah diselesaikan");
}

main()
  .catch((err) => {
    console.log("gagal seed: ", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
