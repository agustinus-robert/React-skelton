import { cookies } from "next/headers";

export async function me() {
  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/me`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    },
  );

  return response.json();
}
