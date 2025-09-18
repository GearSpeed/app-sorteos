import { type YTComment } from '../api/getComments';

interface Props { 
  comment: YTComment;
  isWinner?: boolean;
  isHighlighted?: boolean;
}

export const CommentCard = ({ comment, isWinner = false, isHighlighted = false }: Props) => {
  const getCardClasses = () => {
    const baseClasses = "shadow p-4 rounded-md transition-all duration-300";
    
    if (isWinner) {
      return `${baseClasses} bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 transform scale-105`;
    }
    
    if (isHighlighted) {
      return `${baseClasses} bg-yellow-50 border-2 border-yellow-300`;
    }
    
    return `${baseClasses} bg-white`;
  };

  return (
    <div className={getCardClasses()}>
      {isWinner && (
        <div className="flex items-center justify-center mb-2">
          <span className="text-2xl">👑</span>
          <span className="ml-2 font-bold text-orange-600">GANADOR</span>
          <span className="text-2xl">👑</span>
        </div>
      )}
      <p className="font-semibold text-sm">{comment.author}</p>
      <p className="text-gray-700 mt-1">{comment.text}</p>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>{new Date(comment.publishedAt).toLocaleDateString()}</span>
        <span>👍 {comment.likeCount}</span>
      </div>
    </div>
  );
};