
// Fetcher
// -------
// Wrapper estándar para llamadas a API
// Permite escalar a auth, headers, errores globales

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}