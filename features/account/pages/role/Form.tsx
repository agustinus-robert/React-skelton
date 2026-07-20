import React, { useState, useEffect } from "react";
import { create, update, read } from "../../services/role.service";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function Form() {
  const params = useParams();
  const [form, setForm] = useState({
    name: "",
  });

  const id = Number(params.id);

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
    let actionForm;

    if (id) {
      actionForm = await update(id, form);
    } else {
      actionForm = await create(form);
    }

    if (actionForm?.success == true) {
      toast.success(actionForm?.message);
    } else {
      toast.error(actionForm?.message);
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
            Silakan isi data role baru anda.
          </p>
        </div>

        <div className="col-md-9">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-5">
              <fieldset className="fieldset p-0">
                <legend className="fieldset-legend font-semibold text-base-content/80 mb-1">
                  Nama Role
                </legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Isian Role anda"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
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
