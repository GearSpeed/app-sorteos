const API_KEY = import.meta.env.VITE_YT_API_KEY; // Vite injecta
const BASE = 'https://www.googleapis.com/youtube/v3';

export interface YTComment {
  id: string;
  author: string;
  text: string;
  publishedAt: string;
  likeCount: number;
}

const normalizeHashtag = (hashtag: string): string => {
  return hashtag.replace(/^#/, '').toLowerCase();
};

const getUniqueCommentsByUser = (comments: YTComment[]): YTComment[] => {
  const userComments = new Map<string, YTComment>();
  
  comments.forEach(comment => {
    const normalizedAuthor = comment.author
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ');
    
    const existing = userComments.get(normalizedAuthor);
    if (!existing || comment.likeCount > existing.likeCount) {
      userComments.set(normalizedAuthor, comment);
    }
  });
  
  return Array.from(userComments.values());
};

export async function getComments(videoId: string, hashtag?: string): Promise<YTComment[]> {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const j: any = await res.json();

    if (!j.items) break;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  let filteredComments = all;

  if (hashtag && hashtag.trim()) {
    const normalizedHashtag = normalizeHashtag(hashtag.trim());
    filteredComments = all.filter(comment => {
      const text = comment.text.toLowerCase();

      return text.includes(`#${normalizedHashtag}`) || text.includes(normalizedHashtag);
    });
  }

  return getUniqueCommentsByUser(filteredComments);
}