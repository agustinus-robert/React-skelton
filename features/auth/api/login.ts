export async function login(data: { username: string; password: string }) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
