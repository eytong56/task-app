const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function apiCall(endpoint, { headers = {}, ...options } = {}) {
  const url = `${import.meta.env.VITE_API_URL}${endpoint}`;
  return await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

export default apiCall;
