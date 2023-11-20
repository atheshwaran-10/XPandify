"use client"

import useCommunityPosts from '@/hooks/useCommunityPosts';
import CommunityPostItem from './CommunityPostItem';

interface CommunityPostFeedProps {
  userId?: string;
  communityId:string
}

const CommunityPostFeed: React.FC<CommunityPostFeedProps> = ({ userId,communityId }) => {

  const { data: posts = [] } = useCommunityPosts(communityId,userId!);

  return (
    <>
      {posts.map((post: Record<string, any>,) => (
        <CommunityPostItem userId={userId} key={post.id} data={post} communityId={communityId} />
      ))}
    </>
  );
};

export default CommunityPostFeed;
