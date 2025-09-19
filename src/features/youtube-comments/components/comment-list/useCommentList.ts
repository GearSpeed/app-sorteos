import { useState, useEffect } from 'react';
import { useComments } from '@features/youtube-comments/hooks/useComments';
import { type YTComment } from '@features/youtube-comments/api/getComments';

interface UseCommentListProps {
  videoId: string;
  hashtag?: string;
  attempts: number;
}

interface DrawRound {
  round: number;
  eliminated: YTComment;
  remainingCount: number;
}

export const useCommentList = ({ videoId, hashtag, attempts }: UseCommentListProps) => {
  const { data, isLoading, error } = useComments(videoId, hashtag);
  const [winner, setWinner] = useState<YTComment | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [eliminatedParticipants, setEliminatedParticipants] = useState<YTComment[]>([]);
  const [drawHistory, setDrawHistory] = useState<DrawRound[]>([]);
  const [availableParticipants, setAvailableParticipants] = useState<YTComment[]>([]);
  const [sorteoStarted, setSorteoStarted] = useState(false);
  const [actualRounds, setActualRounds] = useState(0);
  const [effectiveAttempts, setEffectiveAttempts] = useState(attempts);

  useEffect(() => {
    setEffectiveAttempts(attempts);
  }, [attempts]);

  const resetDraw = () => {
    setWinner(null);
    setCurrentRound(0);
    setEliminatedParticipants([]);
    setDrawHistory([]);
    setAvailableParticipants([]);
    setSorteoStarted(false);
    setActualRounds(0);
    setEffectiveAttempts(attempts);
  };

  const startSorteo = () => {
    if (!data || data.length < 2) {
      alert('Se necesitan al menos 2 participantes para realizar el sorteo');
      return;
    }

    const maxPossibleAttempts = data.length;
    const finalAttempts = attempts > maxPossibleAttempts ? maxPossibleAttempts : attempts;
    const realRounds = finalAttempts - 1;
    
    resetDraw();
    setAvailableParticipants([...data]);
    setSorteoStarted(true);
    setCurrentRound(1);
    setActualRounds(realRounds);
    setEffectiveAttempts(finalAttempts);
    
    if (attempts > data.length) {
      alert(`Solo se pueden realizar ${realRounds} rondas de eliminación con ${data.length} participantes`);
    }
  };

  const performNextRound = () => {
    if (!availableParticipants.length) return;
    
    setIsDrawing(true);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availableParticipants.length);
      const selectedParticipant = availableParticipants[randomIndex];
      
      if (currentRound <= actualRounds) {
        const newEliminated = [...eliminatedParticipants, selectedParticipant];
        const remaining = availableParticipants.filter((_, index) => index !== randomIndex);
        
        setEliminatedParticipants(newEliminated);
        setAvailableParticipants(remaining);
        
        const roundInfo: DrawRound = {
          round: currentRound,
          eliminated: selectedParticipant,
          remainingCount: remaining.length
        };
        
        setDrawHistory(prev => [...prev, roundInfo]);
        setCurrentRound(prev => prev + 1);
      } else {
        setWinner(selectedParticipant);
        
        const roundInfo: DrawRound = {
          round: currentRound,
          eliminated: selectedParticipant,
          remainingCount: 0
        };
        
        setDrawHistory(prev => [...prev, roundInfo]);
        setSorteoStarted(false);
      }
      
      setIsDrawing(false);
    }, 1500);
  };

  return {
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
  };
};