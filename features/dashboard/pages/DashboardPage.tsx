export async function DashboardPage() {
  // Data dummy untuk area bawah
  const recentUsers = [
    {
      id: 1,
      name: "Robert",
      email: "robert@example.com",
      role: "Administrator",
      status: "Active",
    },
    {
      id: 2,
      name: "Budi Santoso",
      email: "budi@example.com",
      role: "Editor",
      status: "Active",
    },
    {
      id: 3,
      name: "Siti Rahma",
      email: "siti@example.com",
      role: "User",
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6 space-y-6 text-base-100 min-h-screen">
      {/* 
        GRID ATAS: Pengganti row & col-md-3 dengan Dark Theme
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Total Users */}
        <div className="bg-base-100 p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col justify-between">
          <span className="text-sm font-medium text-slate-400">
            Total Users
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-semibold text-white">1,248</span>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-900 px-2 py-0.5 rounded-full">
              +12%
            </span>
          </div>
        </div>

        {/* Card 2: Active Roles */}
        <div className="bg-base-100 p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col justify-between">
          <span className="text-sm font-medium text-slate-400">
            Active Roles
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-semibold text-white">5</span>
            <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              Static
            </span>
          </div>
        </div>

        {/* Card 3: System Health */}
        <div className="bg-base-100 p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col justify-between">
          <span className="text-sm font-medium text-slate-400">
            System Health
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-semibold text-emerald-400">
              99.9%
            </span>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-900 px-2 py-0.5 rounded-full">
              Stable
            </span>
          </div>
        </div>

        {/* Card 4: Pending Requests */}
        <div className="bg-base-100 p-6 rounded-xl border border-slate-800 shadow-lg flex flex-col justify-between">
          <span className="text-sm font-medium text-slate-400">
            Pending Requests
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-semibold text-white">3</span>
            <span className="text-xs font-medium text-amber-400 bg-amber-950/50 border border-amber-900 px-2 py-0.5 rounded-full">
              Action Req.
            </span>
          </div>
        </div>
      </div>

      {/* 
        BAGIAN BAWAH: Tabel data biar tidak kosong (Dark Version)
      */}
      <div className="bg-base-100 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Recently Registered Users
            </h2>
            <p className="text-sm text-slate-400">
              Overview of the latest users and their assigned system roles.
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-sky-400 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
              {recentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-sky-950/60 text-sky-300 border border-sky-900/50">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        user.status === "Active"
                          ? "text-emerald-400"
                          : "text-slate-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-slate-500"
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
