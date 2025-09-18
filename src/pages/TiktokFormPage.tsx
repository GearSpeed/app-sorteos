import { useNavigate } from 'react-router-dom';

export default function TiktokFormPage() {
  const nav = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-8">App Sorteos</h1>

      <div className="flex gap-6">
        <h1>
            Próximamenta TikTok
        </h1>
      </div>
    </main>
  );
}