import CommentItem from './CommentItem';

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  return (
    <>
      <h2 className='p-3 text-xl font-bold'>Comments</h2>
      {comments.map((comment: Record<string, any>,) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
