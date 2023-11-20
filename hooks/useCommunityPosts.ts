import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCommunityPosts = (communityId:string,userId?: string) => {

 const url = userId
    ? `/api/CommunityPosts?userId=${userId}&communityId=${communityId}`
    : `/api/CommunityPosts?communityId=${communityId}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCommunityPosts;

