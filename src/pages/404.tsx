// src/pages/404.tsx
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4">
      {/* Animación */}
      <div className="w-64 h-64 md:w-80 md:h-80">
        <DotLottieReact
          src="https://lottie.host/6a1e8a42-65b4-41c4-b7c3-d43e3a16f782/1me59ecFaA.lottie"
          loop
          autoplay
        />
      </div>
      {/* Botón */}
      <Link
        to="/"
        className="mt-6 px-5 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Volver al inicio
      </Link>
    </main>
  );
}