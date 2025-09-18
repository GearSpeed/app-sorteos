import { useSearchParams } from 'react-router-dom';
import { CommentsList } from '../features/youtube-comments';

export default function YoutubeCommentsPage() {
  const [params] = useSearchParams();
  const videoId = params.get('v') ?? '';
  const hashtag = params.get('hashtag') ?? '';

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Comentarios del video</h1>
      {hashtag && (
        <p className="text-sm text-gray-600 mb-4">
          Filtrando por: <span className="font-semibold">#{hashtag.replace(/^#/, '')}</span>
        </p>
      )}
      <CommentsList videoId={videoId} hashtag={hashtag} />
    </section>
  );
}