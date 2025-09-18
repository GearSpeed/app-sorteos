import { type YTComment } from '../api/getComments';

interface Props { comment: YTComment }
export const CommentCard = ({ comment }: Props) => (
  <div className="bg-white shadow p-4 rounded-md">
    <p className="font-semibold text-sm">{comment.author}</p>
    <p className="text-gray-700 mt-1">{comment.text}</p>
    <div className="flex justify-between mt-2 text-xs text-gray-500">
      <span>{new Date(comment.publishedAt).toLocaleDateString()}</span>
      <span>👍 {comment.likeCount}</span>
    </div>
  </div>
);