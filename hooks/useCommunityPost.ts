import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCommunityPost = (communityId:string,postId?: string) => {
  const url = postId ? `/api/CommunityPosts/${postId}?postId=${postId}&communityId=${communityId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCommunityPost;
