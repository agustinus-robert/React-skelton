import { LayoutDashboard, User, Shield } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="drawer-side z-40">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>

      <div className="flex min-h-full w-64 flex-col bg-base-200 text-base-content border-r border-base-300">
        <div className="flex h-16 items-center px-6 border-b border-base-300">
          <span className="text-lg font-bold tracking-wider text-primary">
            ADMIN PANEL
          </span>
        </div>

        {/* Menu Navigation */}
        <ul className="menu w-full grow p-4 gap-1">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-base-300 transition-colors"
            >
              <LayoutDashboard className="size-5 text-base-content/70" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href="/user"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-base-300 transition-colors"
            >
              <User className="size-5 text-base-content/70" />
              <span className="font-medium">Manajemen User</span>
            </Link>
          </li>

          <li>
            <Link
              href="/role"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-base-300 transition-colors"
            >
              <Shield className="size-5 text-base-content/70" />
              <span className="font-medium">Manajemen Role</span>
            </Link>
          </li>
        </ul>

        {/* Footer Sidebar (Opsional, untuk info user login) */}
        <div className="p-4 border-t border-b-0 border-base-300 bg-base-300/30 text-xs text-base-content/60 text-center">
          created Backend2
        </div>
      </div>
    </div>
  );
}
