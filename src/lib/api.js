// Base API URL — reads from .env
// Make sure VITE_API_URL is set in your .env file
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

// Generic fetch wrapper for public (unauthenticated) requests
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, options);

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Request failed");
  }

  return res.json();
}