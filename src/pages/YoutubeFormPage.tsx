import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function YoutubeFormPage() {
  const nav = useNavigate();
  const [input, setInput] = useState('');
  const [hashtag, setHashtag] = useState('');

  // acepta "dQw4w9WgXcQ" o "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  const extractId = (url: string) =>
    url.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/)?.[1] ?? url;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractId(input.trim());
    if (!id) return alert('ID o URL inválida');
    
    const params = new URLSearchParams({ v: id });
    if (hashtag.trim()) {
      params.set('hashtag', hashtag.trim());
    }
    nav(`/comments?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">App Sorteos</h1>
        <label className="block mb-2 text-sm text-gray-700">Pega el link o ID del video:</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <label className="block mb-2 text-sm text-gray-700">Hashtag para filtrar (opcional):</label>
        <input
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          placeholder="#hashtag o hashtag"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Ver comentarios
        </button>
      </form>
    </div>
  );
}