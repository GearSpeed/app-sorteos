import { useMemo } from 'react';

interface UseCommentCardProps {
  isWinner?: boolean;
  isHighlighted?: boolean;
}

export const useCommentCard = ({ isWinner = false, isHighlighted = false }: UseCommentCardProps) => {
  const cardClasses = useMemo(() => {
    const baseClasses = "shadow p-4 rounded-md transition-all duration-300";
    
    if (isWinner) {
      return `${baseClasses} bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 transform scale-105`;
    }
    
    if (isHighlighted) {
      return `${baseClasses} bg-yellow-50 border-2 border-yellow-300`;
    }
    
    return `${baseClasses} bg-white`;
  }, [isWinner, isHighlighted]);

  return {
    cardClasses
  };
};