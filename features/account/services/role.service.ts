"use server";
import * as Role from "../respositories/role.repository";
import type { roleInf } from "../types/role";
import { writeLog } from "@/lib/logger";

export async function getRole() {
  try {
    const getRoleData = await Role.getRole();

    if (getRoleData) {
      return {
        success: true,
        message: "Role Berhasil dimuat",
        data: getRoleData,
      };
    }
  } catch (error) {
    writeLog(error, "getRole");
    return {
      success: false,
      message: "Role gagal diambil",
      data: null,
    };
  }
}

export async function getPermission() {
  try {
    const getPermissionData = await Role.permission();

    if (getPermissionData) {
      return {
        success: true,
        message: "Permission Berhasil dimuat",
        data: getPermissionData,
      };
    }
  } catch (error) {
    writeLog(error, "getPermission");
    return {
      success: false,
      message: "Permission gagal diambil",
      data: null,
    };
  }
}

export async function getRolePermission(id: number) {
  try {
    const getRolePermissionData = await Role.rolePermission(id);

    if (getRolePermissionData) {
      return {
        success: true,
        message: "Permission Berhasil dimuat",
        data: getRolePermissionData,
      };
    }
  } catch (error) {
    writeLog(error, "getPermission");
    return {
      success: false,
      message: "Permission gagal diambil",
      data: null,
    };
  }
}

export async function create(data: roleInf) {
  try {
    const createRole = await Role.storeRole(data);

    if (createRole) {
      return {
        success: true,
        message: "Role Telah ditambahkan",
        data: {
          name: createRole.name,
        },
      };
    }
  } catch (error) {
    writeLog(error, "roleCreate");
    return {
      success: false,
      message: "Role gagal ditambahkan",
      data: null,
    };
  }
}

export async function read(id: number) {
  try {
    const readRole = await Role.getIdRole(id);

    if (readRole) {
      return {
        success: true,
        message: "Role berasil ditampilkan",
        data: {
          name: readRole.name,
        },
      };
    }
  } catch (error) {
    writeLog(error, "roleRead");
    return {
      success: false,
      message: "Role gagal ditampilkan",
      data: null,
    };
  }
}

export async function update(id: number, data: roleInf) {
  try {
    const updateRole = await Role.updateRole(id, data);
    if (updateRole) {
      return {
        success: true,
        message: "Role berhasil diubah",
        data: {
          name: updateRole.name,
        },
      };
    }
  } catch (error) {
    writeLog(error, "roleUpdate");
    return {
      success: false,
      message: "Role gagal diperbarui",
      data: null,
    };
  }
}

export async function erase(id: number) {
  try {
    const eraseRole = await Role.deleteRole(id);
    if (eraseRole) {
      return {
        success: true,
        message: "Role berhasil dihapus",
        data: {
          name: eraseRole.name,
        },
      };
    }
  } catch (error) {
    writeLog(error, "roleDelete");
    return {
      success: false,
      message: "Role gagal dihapus",
      data: null,
    };
  }
}

export async function rolePermissionUpsert(id: number, data: any) {
  try {
    const rolePermissionUpsertData = await Role.upsertRolePermission(id, data);
    return {
      success: true,
      message: "Role Permission berhasil disesuaikan",
      data: null,
    };
  } catch (error) {
    writeLog(error, "rolePermissionUpsert");
    return {
      success: false,
      message: "Permission role gagal disesuaikan",
      data: null,
    };
  }
}
