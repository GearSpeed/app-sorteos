import { useSearchParams } from 'react-router-dom';
import { CommentsList } from '../features/youtube-comments';

export default function YoutubeCommentsPage() {
  const [params] = useSearchParams();
  const videoId = params.get('v') ?? '';

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Comentarios del video</h1>
      <CommentsList videoId={videoId} />
    </section>
  );
}