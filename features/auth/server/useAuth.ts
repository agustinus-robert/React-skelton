import { cookies } from "next/headers";
import { meUser } from "../services/me.service";

export default async function useAuth() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  async function me() {
    if (!token) {
      return null;
    }

    return await meUser(token);
  }

  return {
    me,
  };
}
