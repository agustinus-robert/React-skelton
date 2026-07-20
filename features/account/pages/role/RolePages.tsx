import { getRole, erase } from "../../services/role.service";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, UserKey, Trash } from "lucide-react";
import { DataTable } from "@/lib/table";
import { ColumnDef } from "@tanstack/react-table";
import { useAuth } from "@/app/(admin)/providers/auth-provider";
import { can } from "@/lib/permission";

interface Role {
  id: number;
  name: string;
}

export default function RolePage() {
  const title = "Daftar Role";
  const page = "role";
  const [role, setRole] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuth();
  const canCreate = can(user, "can_create", page ?? "");
  const canEdit = can(user, "can_edit", page ?? "");
  const canDelete = can(user, "can_delete", page ?? "");

  async function fetchRole() {
    setLoading(true);
    const res = await getRole();

    if (res?.success && res?.data) {
      setRole(res.data);
    }
  }

  useEffect(function () {
    fetchRole();
  }, []);

  async function handleDelete(id: number) {
    if (confirm("Apakah anda yakin mengahapus data ini?")) {
      const res = await erase(id);

      if (res?.success == true) {
        setRole(function (prev) {
          return prev.filter(function (data) {
            if (data.id !== id) {
              return true;
            }
          });
        });
      }
    }
  }

  const columns: ColumnDef<Role>[] = [
    { accessorKey: "name", header: "Nama Role" },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-3">
          {canEdit && (
            <Link
              href={`${page}/edit/${row.original.id}`}
              className="btn btn-warning btn-xs btn-outline"
            >
              <Pencil size="12" />
            </Link>
          )}

          {canCreate && (
            <Link
              href={`${page}/permission/${row.original.id}`}
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
      <DataTable page={page} columns={columns} data={role} title={title} />
    </div>
  );
}
