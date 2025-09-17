const API_KEY = import.meta.env.VITE_YT_API_KEY; // Vite injecta
const BASE = 'https://www.googleapis.com/youtube/v3';

export interface YTComment {
  id: string;
  author: string;
  text: string;
  publishedAt: string;
  likeCount: number;
}

export async function getComments(videoId: string): Promise<YTComment[]> {
  const parts = 'snippet';
  let pageToken = '';
  const all: YTComment[] = [];

  do {
    const qs = new URLSearchParams({
      key: API_KEY,
      part: parts,
      videoId,
      maxResults: '100',
      ...(pageToken && { pageToken }),
    });
    const res = await fetch(`${BASE}/commentThreads?${qs}`);
    if (!res.ok) throw new Error('YouTube API error ' + res.status);
    const j: any = await res.json();

    if (!j.items) break;
    j.items.forEach((t: any) => {
      const top = t.snippet.topLevelComment.snippet;
      all.push({
        id: t.id,
        author: top.authorDisplayName,
        text: top.textOriginal,
        publishedAt: top.publishedAt,
        likeCount: top.likeCount,
      });
    });
    pageToken = j.nextPageToken || '';
  } while (pageToken);
  return all;
}