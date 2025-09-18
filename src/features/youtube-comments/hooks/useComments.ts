import { useQuery } from '@tanstack/react-query';
import { getComments } from '../api/getComments';

export function useComments(videoId: string, hashtag?: string) {
  return useQuery({
    queryKey: ['comments', videoId, hashtag],
    queryFn: () => getComments(videoId, hashtag),
    enabled: !!videoId,
  });
}