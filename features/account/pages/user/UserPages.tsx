import { getdata, erase } from "../../services/user.service";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, UserKey, Trash } from "lucide-react";
import { DataTable } from "@/lib/table";
import { ColumnDef } from "@tanstack/react-table";
import { useAuth } from "@/app/(admin)/providers/auth-provider";
import { can } from "@/lib/permission";

interface User {
  id: number;
  email: string;
  name: string;
  username: string;
}

export default function UserPage() {
  const title = "Daftar User";
  const page = "user";
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const canCreate = can(user, "can_create", page ?? "");
  const canEdit = can(user, "can_edit", page ?? "");
  const canDelete = can(user, "can_delete", page ?? "");

  useEffect(function () {
    async function fetchUser() {
      setLoading(true);
      const res = await getdata();

      if (res?.success && res?.data) {
        setUser(res.data);
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  async function handleDelete(id: number) {
    if (confirm("Apakah anda yakin mengahapus data ini?")) {
      const res = await erase(id);

      if (res?.success == true) {
        setUser(function (prev) {
          return prev.filter(function (data) {
            if (data.id !== id) {
              return true;
            }
          });
        });
      }
    }
  }

  const columns: ColumnDef<User>[] = [
    { accessorKey: "email", header: "Email" },
    { accessorKey: "name", header: "Nama" },
    { accessorKey: "username", header: "Username" },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-3">
          {canEdit && (
            <Link
              href={`user/edit/${row.original.id}`}
              className="btn btn-warning btn-xs btn-outline"
            >
              <Pencil size="12" />
            </Link>
          )}

          {canCreate && (
            <Link
              href={`user/role/${row.original.id}`}
              className="btn btn-info btn-xs btn-outline"
            >
              <UserKey size="12" />
            </Link>
          )}

          {canDelete && (
            <button
              onClick={() => handleDelete(row.original.id)}
              className="btn btn-error btn-xs btn-outline"
            >
              <Trash size="12" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-8xl mx-auto bg-base-100 rounded-xl shadow">
      <DataTable page={page} columns={columns} data={user} title={title} />
    </div>
  );
}
