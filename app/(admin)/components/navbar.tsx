import { Grip, LogOut } from "lucide-react";
import logout from "@/features/auth/actions/logout.action";

export default function Navbar() {
  return (
    <div>
      <nav className="flex navbar w-full bg-base-300">
        <label
          htmlFor="my-drawer-4"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="my-1.5 inline-block size-4"
          >
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </label>
        <div className="px-4 font-bold">CMS System</div>

        <div className="ml-auto px-4 flex gap-4">
          <Grip className="w-6 h-6 cursor-pointer" />
          <div className="w-6 h-6 rounded-full border">
            <img className="rounded-full" src="/images/profile.png" />
          </div>
          <form action={logout}>
            <button type="submit" className="link link-error">
              <LogOut />
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}
