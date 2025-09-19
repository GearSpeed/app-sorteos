import { CommentCard } from '@features/youtube-comments/components/comment-card/CommentCard';
import { type YTComment } from '@features/youtube-comments/api/getComments';
import { useCommentList } from './useCommentList';

interface Props { 
  videoId: string;
  hashtag?: string;
  attempts: number;
}

export const CommentsList = ({ videoId, hashtag, attempts }: Props) => {
  const {
    data,
    isLoading,
    error,
    winner,
    isDrawing,
    currentRound,
    eliminatedParticipants,
    drawHistory,
    availableParticipants,
    sorteoStarted,
    actualRounds,
    effectiveAttempts,
    resetDraw,
    startSorteo,
    performNextRound
  } = useCommentList({ videoId, hashtag, attempts });

  if (isLoading) return <p className="p-4">Cargando comentarios…</p>;
  if (error) return <p className="p-4 text-red-600">Error al cargar.</p>;
  if (!data?.length) return <p className="p-4">Sin comentarios.</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4">
        {!sorteoStarted && !winner ? (
          <button
            onClick={startSorteo}
            disabled={isDrawing || !data?.length || data.length < 2}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
              isDrawing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : data.length < 2
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            🎲 Iniciar Sorteo ({effectiveAttempts} rondas)
          </button>
        ) : sorteoStarted && !winner ? (
          <button
            onClick={performNextRound}
            disabled={isDrawing}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
              isDrawing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : currentRound <= actualRounds
                ? 'bg-red-600 hover:bg-red-700 active:scale-95'
                : 'bg-green-600 hover:bg-green-700 active:scale-95'
            }`}
          >
            {isDrawing 
              ? '🎲 Sorteando...' 
              : currentRound <= actualRounds 
              ? `❌ Eliminar Participante (Ronda ${currentRound})`
              : '🏆 Seleccionar Ganador Final'
            }
          </button>
        ) : (
          <button
            onClick={resetDraw}
            className="px-6 py-3 rounded-lg font-semibold text-white bg-gray-600 hover:bg-gray-700 active:scale-95 transition-all"
          >
            🔄 Nuevo Sorteo
          </button>
        )}
      </div>

      {sorteoStarted && !winner && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Ronda {currentRound} de {actualRounds + 1}
          </h3>
          <p className="text-blue-600">
            {currentRound <= actualRounds 
              ? `Participantes restantes: ${availableParticipants.length}` 
              : 'Listo para seleccionar el ganador final'
            }
          </p>
          {attempts > (data?.length || 0) && (
            <p className="text-sm text-orange-600 mt-2">
              ⚠️ Solo se realizarán {actualRounds} rondas de eliminación con {effectiveAttempts} intentos debido al número limitado de participantes
            </p>
          )}
        </div>
      )}

      {drawHistory.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Historial del Sorteo</h3>
          <div className="space-y-2">
            {drawHistory.map((round, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                <span className="font-medium">
                  Ronda {round.round}: 
                </span>
                <span className="text-sm">
                  {round.round <= actualRounds ? (
                     <>
                       <span className="text-red-600 font-medium">{round.eliminated.author}</span> eliminado
                       <span className="text-gray-500 ml-2">({round.remainingCount} restantes)</span>
                     </>
                   ) : (
                     <span className="text-green-600 font-bold">¡{round.eliminated.author} es el GANADOR!</span>
                   )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

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
          {availableParticipants.length > 0 && availableParticipants.length !== data.length && (
            <span className="text-sm text-gray-600 ml-2">
              ({availableParticipants.length} activos)
            </span>
          )}
        </h3>
        <div className="grid gap-4">
          {data.map((c: YTComment) => {
            const isEliminated = eliminatedParticipants.some(eliminated => eliminated.id === c.id);
            const isWinnerComment = winner?.id === c.id;
            
            return (
              <div key={c.id} className={isEliminated ? 'opacity-50' : ''}>
                <CommentCard 
                  comment={c} 
                  isHighlighted={isWinnerComment}
                  isWinner={isWinnerComment}
                />
                {isEliminated && (
                  <div className="text-xs text-red-500 mt-1 text-center">
                    ❌ Eliminado en ronda {eliminatedParticipants.findIndex(e => e.id === c.id) + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};