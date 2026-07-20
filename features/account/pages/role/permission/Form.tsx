"use client";

import { useEffect, useState } from "react";
import type { Permission } from "@/features/account/types/permission";
import {
  rolePermissionUpsert,
  getPermission,
  getRolePermission, // Pastikan di-import dari service Anda
} from "../../../services/role.service";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface RolePermissionState {
  [permission_id: number]: {
    can_create: boolean;
    can_read: boolean;
    can_update: boolean;
    can_delete: boolean;
  };
}

export default function Form() {
  const params = useParams();
  const id = Number(params.id);

  const [permission, setPermission] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] =
    useState<RolePermissionState>({});

  async function loadPermission() {
    const masterResult = await getPermission();
    const activeResult = await getRolePermission(id);

    if (!masterResult?.success) {
      return;
    }

    const masterModules = masterResult.data as any[];

    let activePermissions: any[] = [];

    if (activeResult?.success) {
      activePermissions = activeResult.data as any[];
    }

    setPermission(masterModules);

    const initialValues: RolePermissionState = {};

    masterModules.forEach(function (module) {
      let savedPermission = null;

      for (const permission of activePermissions) {
        if (
          permission.permission_id === module.id ||
          permission.id === module.id
        ) {
          savedPermission = permission;
          break;
        }
      }

      initialValues[module.id] = {
        can_create: savedPermission?.can_create ?? false,
        can_read: savedPermission?.can_read ?? false,
        can_update:
          savedPermission?.can_update ?? savedPermission?.can_edit ?? false,
        can_delete: savedPermission?.can_delete ?? false,
      };
    });

    setSelectedPermissions(initialValues);
  }

  useEffect(
    function () {
      if (id) {
        loadPermission();
      }
    },
    [id],
  );

  function handleCheckboxChange(
    permissionId: number,
    column: "can_create" | "can_read" | "can_update" | "can_delete",
  ) {
    setSelectedPermissions(function (prev) {
      const permissions = { ...prev };
      const permission = { ...permissions[permissionId] };

      if (permission[column]) {
        permission[column] = false;
      } else {
        permission[column] = true;
      }

      permissions[permissionId] = permission;
      return permissions;
    });
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = [];
    for (const permissionId in selectedPermissions) {
      const permission = selectedPermissions[permissionId];

      payload.push({
        role_id: id,
        permission_id: Number(permissionId),
        can_create: permission.can_create,
        can_read: permission.can_read,
        can_update: permission.can_update,
        can_delete: permission.can_delete,
      });
    }

    const res = await rolePermissionUpsert(id, payload);
    if (res?.success) {
      toast.success("Permission Berhasil disimpan!");
    } else {
      toast.error("Permission Gagal disimpan");
    }
  }

  return (
    <div>
      <div>
        <div>
          <div className="row border border-slate-800 rounded-xl bg-slate-900 shadow-sm p-6 md:p-8 m-4 text-slate-100">
            <div className="col-md-3 py-2">
              <h2 className="text-xl font-bold text-white tracking-wide">
                Role Permission
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Silakan isi data permission role baru anda.
              </p>
            </div>

            <div className="col-md-9">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-5">
                  <div className="flex flex-col gap-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-sm font-semibold text-slate-400 pb-2 border-b border-slate-800 hidden md:grid md:grid-cols-5 gap-4 px-2">
                      <div>Modul / Fitur</div>
                      <div className="text-center">Create</div>
                      <div className="text-center">Read</div>
                      <div className="text-center">Update</div>
                      <div className="text-center">Delete</div>
                    </div>

                    {permission.map(function (item) {
                      let rowState = selectedPermissions[item.id];
                      if (!rowState) {
                        rowState = {
                          can_create: false,
                          can_read: false,
                          can_update: false,
                          can_delete: false,
                        };
                      }

                      return (
                        <div
                          key={item.id}
                          className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 items-center py-3 px-2 border-b border-slate-800/50 last:border-0 hover:bg-slate-900/40 rounded transition-colors"
                        >
                          <div className="text-sm font-medium text-white">
                            {item.name}
                          </div>

                          {/* Checkbox Create */}
                          <div className="flex items-center justify-between md:justify-center gap-2">
                            <span className="text-xs text-slate-400 md:hidden">
                              Create
                            </span>
                            <input
                              type="checkbox"
                              checked={rowState.can_create}
                              onChange={() =>
                                handleCheckboxChange(item.id, "can_create")
                              }
                              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-950"
                            />
                          </div>

                          {/* Checkbox Read */}
                          <div className="flex items-center justify-between md:justify-center gap-2">
                            <span className="text-xs text-slate-400 md:hidden">
                              Read
                            </span>
                            <input
                              type="checkbox"
                              checked={rowState.can_read}
                              onChange={() =>
                                handleCheckboxChange(item.id, "can_read")
                              }
                              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-950"
                            />
                          </div>

                          {/* Checkbox Update */}
                          <div className="flex items-center justify-between md:justify-center gap-2">
                            <span className="text-xs text-slate-400 md:hidden">
                              Update
                            </span>
                            <input
                              type="checkbox"
                              checked={rowState.can_update}
                              onChange={() =>
                                handleCheckboxChange(item.id, "can_update")
                              }
                              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-950"
                            />
                          </div>

                          {/* Checkbox Delete */}
                          <div className="flex items-center justify-between md:justify-center gap-2">
                            <span className="text-xs text-slate-400 md:hidden">
                              Delete
                            </span>
                            <input
                              type="checkbox"
                              checked={rowState.can_delete}
                              onChange={() =>
                                handleCheckboxChange(item.id, "can_delete")
                              }
                              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-950"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-slate-800 pt-4 mt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                      onClick={() => window.history.back()}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors shadow-md"
                    >
                      Simpan Data
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
