import { useComments } from '../hooks/useComments';
import { CommentCard } from './CommentCard';
import { type YTComment } from '../api/getComments';

interface Props { videoId: string }
export const CommentsList = ({ videoId }: Props) => {
  const { data, isLoading, error } = useComments(videoId);

  if (isLoading) return <p className="p-4">Cargando comentarios…</p>;
  if (error) return <p className="p-4 text-red-600">Error al cargar.</p>;
  if (!data?.length) return <p className="p-4">Sin comentarios.</p>;

  return (
    <div className="grid gap-4">
      {data!.map((c: YTComment) => <CommentCard key={c.id} comment={c} />)}
    </div>
  );
};