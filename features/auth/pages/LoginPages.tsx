"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { login } from "../api/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPages() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const loginFormAction = await login(form);

    if (loginFormAction.success) {
      toast.success("Anda berhasil login");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      toast.error("Login Gagal");
    }
  };

  return (
    <div className="grid grid-cols-6 mx-auto">
      <div className="col-span-6 mt-6">
        <div className="card border p-4">
          <div className="card-title justify-center">
            <p className="text-center">Login Form</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-4">
                <label className="input">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    className="grow"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        username: e.target.value,
                      })
                    }
                    placeholder="Username anda"
                  />
                </label>

                <label className="input">
                  <FontAwesomeIcon icon={faKey} />

                  <input
                    type="password"
                    className="grow"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    placeholder="Password"
                  />
                </label>

                <div className="flex justify-between">
                  <div className="card-actions justify-start mt-2">
                    Lupa Password?
                  </div>
                  <div className="card-actions justify-end">
                    <button type="submit" className="btn btn-sm btn-primary">
                      Log In
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
