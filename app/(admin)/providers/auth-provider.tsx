"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
