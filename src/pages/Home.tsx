import { useNavigate } from 'react-router-dom';

export default function Home() {
  const nav = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-8">App Sorteos</h1>

      <div className="flex gap-6">
        {/* YouTube */}
        <button
          onClick={() => nav('/youtube')}
          className="px-6 py-4 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          Sorteos con YouTube
        </button>

        {/* TikTok */}
        <button
          onClick={() => nav('/tiktok')}
          className="px-6 py-4 rounded-lg bg-black text-white hover:bg-gray-900 transition"
        >
          Sorteos con TikTok
        </button>
      </div>
    </main>
  );
}