import { upsertUserRole, read } from "@/features/account/services/user.service";
import { getRole as dataRole } from "@/features/account/services/role.service";
import type { roleComplete } from "@/features/account/types/role";
import type {
  getUserPayload,
  userRolePayload,
} from "@/features/account/types/user";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function Form() {
  const [getRole, setGetRole] = useState<roleComplete[]>([]);
  const [userRole, setUserRole] = useState<getUserPayload | null>(null);
  const [form, setForm] = useState<userRolePayload>({
    user_id: null,
    role_id: null,
  });
  const getParam = useParams();
  const id = Number(getParam.id);

  async function getUserRole() {
    const res = await read(id);

    if (res?.success) {
      setUserRole(function (prev) {
        return {
          ...prev,
          ...res.data,
        };
      });

      setForm({
        user_id: id,
        role_id: res.data?.role_id ?? null,
      });
    }
  }

  async function getAllRole() {
    const res = await dataRole();

    if (res?.success && res.data) {
      setGetRole(res?.data);
    }
  }

  useEffect(function () {
    getAllRole();
    getUserRole();
  }, []);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    let actionRoleUser;
    const sendRoleUser = await upsertUserRole(id, form);

    if (sendRoleUser.success) {
      toast.success(sendRoleUser.message);
    } else {
      toast.error(sendRoleUser.message);
    }
  }

  return (
    <div>
      <div className="row border border-base-300 rounded-xl bg-base-100 shadow-sm p-6 md:p-8 m-4">
        <div className="col-md-3 py-2">
          <h2 className="text-xl font-bold text-base-content tracking-wide">
            Tambah Data
          </h2>
          <p className="text-sm text-base-content/60 mt-1">
            Silakan isi data pengguna baru secara lengkap.
          </p>
        </div>

        <div className="col-md-9">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-5">
              <fieldset className="fieldset p-0">
                <legend className="fieldset-legend font-semibold text-base-content/80 mb-1">
                  Nama
                </legend>
                <select
                  defaultValue="Pick a browser"
                  className="select"
                  onChange={function (e) {
                    setForm(function (prev) {
                      return {
                        ...prev,
                        role_id: Number(e.target.value),
                        user_id: Number(id),
                      };
                    });
                  }}
                  value={form?.role_id ?? ""}
                >
                  <option value="">Pilih Role</option>
                  {getRole.map(function (item) {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </fieldset>

              <div className="border-t border-base-200 pt-4 mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={function () {
                    window.history.back();
                  }}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-sm btn-primary px-6">
                  Simpan Data
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
