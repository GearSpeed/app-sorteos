// src/pages/404.tsx
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
      <p className="mt-4 text-lg">Página no encontrada</p>
      <a
        href="/"
        className="mt-6 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Volver al inicio
      </a>
    </main>
  );
}