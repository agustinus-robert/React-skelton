import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import AuthProvider from "./providers/auth-provider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }

  const role = user.userRole[0];

  const auth = {
    id: user.id,
    name: user.name,
    role: role?.role.name,

    userPermission:
      role?.role.userPermission.map((item) => ({
        permission: {
          id: item.permission.id,
          name: item.permission.name.toLowerCase(),
        },
        can_create: item.can_create,
        can_read: item.can_read,
        can_update: item.can_update,
        can_delete: item.can_delete,
      })) ?? [],
  };

  return (
    <AuthProvider user={auth}>
      <div className="drawer lg:drawer-open">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-1 p-6 bg-base-200">{children}</main>
        </div>

        <Sidebar />
      </div>
    </AuthProvider>
  );
}
