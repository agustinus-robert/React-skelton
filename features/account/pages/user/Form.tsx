import React, { useState, useEffect } from "react";
import { create, update, read } from "../../services/user.service";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function Form() {
  const params = useParams();
  const id = Number(params.id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    repassword: "",
  });

  async function load() {
    if (!id) return;

    const result = await read(id);

    if (result?.data) {
      setForm((prev) => ({
        ...prev,
        ...result.data,
      }));
    }
  }

  useEffect(function () {
    load();
  }, []);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    let formAction;
    if (id && form.password !== "") {
      if (form.password !== form.repassword) {
        toast.error("Password dan Re-Type Password tidak sama");
        return;
      }
    } else {
      if (form.password !== form.repassword) {
        toast.error("Password dan Re-Type Password tidak sama");
        return;
      }
    }

    const { repassword, ...payload } = form;

    if (id) {
      formAction = await update(id, payload);
    } else {
      formAction = await create(payload);
    }

    if (formAction?.success == true) {
      toast.success(formAction?.message);
    } else {
      toast.error(formAction?.message);
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
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Isian Nama anda"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
                {/* <p className="label">Optional</p> */}
              </fieldset>

              <fieldset className="fieldset p-0">
                <legend className="fieldset-legend font-semibold text-base-content/80 mb-1">
                  Email
                </legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Isian Email anda"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
              </fieldset>

              <fieldset className="fieldset p-0">
                <legend className="fieldset-legend font-semibold text-base-content/80 mb-1">
                  Username
                </legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Isian Nama anda"
                  value={form.username}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      username: e.target.value,
                    })
                  }
                />
              </fieldset>

              {/* Grid Internal untuk Password agar hemat ruang secara horizontal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="fieldset p-0">
                  <legend className="fieldset-legend font-semibold text-base-content/80 mb-1">
                    Password
                  </legend>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Isian Password anda"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                  />
                </fieldset>

                <fieldset className="fieldset p-0">
                  <legend className="fieldset-legend font-semibold text-base-content/80 mb-1">
                    Ulangi Password
                  </legend>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Ulangi Password anda"
                    onChange={(e) =>
                      setForm({ ...form, repassword: e.target.value })
                    }
                  />
                </fieldset>
              </div>

              {/* Bagian Action Tombol */}
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
