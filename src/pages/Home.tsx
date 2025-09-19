import { useNavigate } from 'react-router-dom';
import YouTubeComponent from '@components/svg/YouTubeComponent'
import TikTokComponent from '@components/svg/TikTokComponent'

export default function Home() {
  const nav = useNavigate();

  return (
    <main className="min-h-screen flex">
      {/* Contenedor grupo para hover compartido */}
      {/* Botón YouTube */}
      <div className="group w-1/2">
        <button
          onClick={() => nav('/youtube')}
          className="w-full h-screen flex items-center justify-center
                    bg-red-600 text-white text-2xl font-semibold
                    transition hover:bg-red-700"
        >
          <YouTubeComponent width={64} height={64} colored={false} />
          <span className="ml-3">Sorteos con YouTube</span>
        </button>
      </div>

      {/* Botón TikTok */}
      <div className="group w-1/2">
        <button
          onClick={() => nav('/tiktok')}
          className="w-full h-screen flex items-center justify-center
                    bg-black text-white text-2xl font-semibold
                    transition hover:bg-gray-900"
        >
          <TikTokComponent />
          <span className="ml-3">Sorteos con TikTok</span>
        </button>
      </div>
    </main>
  );
}