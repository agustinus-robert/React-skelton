"use server";
import bcrypt from "bcrypt";
import * as User from "../respositories/user.repository";
import { writeLog } from "@/lib/logger";
import type { CreateUserPayload, UpdateUserPayload } from "../types/user";
export async function getdata() {
  try {
    const getAllData = await User.getUser();

    if (getAllData) {
      return {
        success: true,
        message: "Data user diambil",
        data: getAllData,
      };
    }
  } catch (error) {
    writeLog(error, "getUsers");
  }
}

export async function create(data: CreateUserPayload) {
  try {
    const payload: CreateUserPayload = {
      ...data,
      password: await bcrypt.hash(data.password, 10),
    };

    const storedData = await User.storeUser(payload);

    return {
      success: true,
      message: "User telah ditambahkan",
      data: {
        name: storedData.name,
      },
    };
  } catch (error) {
    writeLog(error, "createUser");

    return {
      success: false,
      message: "User gagal ditambahkan",
      data: null,
    };
  }
}
export async function read(id: number) {
  try {
    const readData = await User.getUserId(id);

    if (readData) {
      return {
        success: true,
        message: "Data User berhasil diambil",
        data: {
          name: readData.name,
          username: readData.username,
          email: readData.email,
          role_id: readData.userRole[0].role_id,
        },
      };
    }
  } catch (error) {
    writeLog(error, "readUser");
    return {
      success: false,
      message: "Data user gagal diambil",
      data: null,
    };
  }
}

export async function update(id: number, data: UpdateUserPayload) {
  try {
    const payload: UpdateUserPayload = { ...data };

    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    } else {
      delete payload.password;
    }

    const updateData = await User.updateUser(id, payload);

    return {
      success: true,
      message: "Data user telah diperbarui",
      data: {
        name: updateData.name,
      },
    };
  } catch (error) {
    writeLog(error, "updateUser");

    return {
      success: false,
      message: "Data user gagal diperbarui",
      data: null,
    };
  }
}

export async function erase(id: number) {
  try {
    const eraseData = await User.deleteUser(id);
    if (eraseData) {
      return {
        success: true,
        message: "Data user berhasil dihapus",
        data: {
          name: eraseData.name,
        },
      };
    }
  } catch (error) {
    writeLog(error, "deleteUser");
    return {
      success: false,
      message: "Data user gagal dihapus",
      data: null,
    };
  }
}

export async function upsertUserRole(id: number, data: any) {
  try {
    const upsertUserRoleData = await User.upsertUserRole(id, data);

    return {
      success: true,
      message: "Data Role pada user sudah disesuikan",
      data: data,
    };
  } catch (error) {
    writeLog(error, "upsertUserRole");
    return {
      success: false,
      message: "Role pada user gagal ditambakan",
      data: null,
    };
  }
}
