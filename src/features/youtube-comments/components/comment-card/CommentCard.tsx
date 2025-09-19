import { type YTComment } from '@features/youtube-comments/api/getComments';
import { useCommentCard } from './useCommentCard';

interface Props { 
  comment: YTComment;
  isWinner?: boolean;
  isHighlighted?: boolean;
}

export const CommentCard = ({ comment, isWinner = false, isHighlighted = false }: Props) => {
  const { cardClasses } = useCommentCard({ isWinner, isHighlighted });

  return (
    <div className={cardClasses}>
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