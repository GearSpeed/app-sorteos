import { useState } from 'react';
import { useComments } from '../hooks/useComments';
import { CommentCard } from './CommentCard';
import { type YTComment } from '../api/getComments';

interface Props { 
  videoId: string;
  hashtag?: string;
}

export const CommentsList = ({ videoId, hashtag }: Props) => {
  const { data, isLoading, error } = useComments(videoId, hashtag);
  const [winner, setWinner] = useState<YTComment | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleRandomDraw = () => {
    if (!data || data.length === 0) return;
    
    setIsDrawing(true);
    setWinner(null);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * data.length);
      setWinner(data[randomIndex]);
      setIsDrawing(false);
    }, 1500);
  };

  if (isLoading) return <p className="p-4">Cargando comentarios…</p>;
  if (error) return <p className="p-4 text-red-600">Error al cargar.</p>;
  if (!data?.length) return <p className="p-4">Sin comentarios.</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <button
          onClick={handleRandomDraw}
          disabled={isDrawing || !data?.length}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
            isDrawing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 active:scale-95'
          }`}
        >
          {isDrawing ? '🎲 Sorteando...' : '🎲 Realizar Sorteo'}
        </button>
      </div>

      {winner && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            🎉 ¡GANADOR DEL SORTEO! 🎉
          </h2>
          <div className="bg-white rounded-lg p-4">
            <CommentCard comment={winner} isWinner={true} />
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Participantes ({data.length} {data.length === 1 ? 'comentario' : 'comentarios'})
        </h3>
        <div className="grid gap-4">
          {data.map((c: YTComment) => (
            <CommentCard 
              key={c.id} 
              comment={c} 
              isHighlighted={winner?.id === c.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};