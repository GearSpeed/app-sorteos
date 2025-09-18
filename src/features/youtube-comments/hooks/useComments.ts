import { useQuery } from '@tanstack/react-query';
import { getComments } from '../api/getComments';

export function useComments(videoId: string) {
  return useQuery({
    queryKey: ['comments', videoId],
    queryFn: () => getComments(videoId),
    enabled: !!videoId,
  });
}