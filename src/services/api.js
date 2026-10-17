const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Apida xato: ${res.status}`);
  }

  return await res.json();
}
