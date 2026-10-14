const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

export async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Apida xato: ${res.status}`);
  }

  return await res.json();
}
