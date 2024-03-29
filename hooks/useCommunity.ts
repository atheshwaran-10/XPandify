import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCommunity = (communityId: string) => {
  const { data, error, isLoading, mutate } = useSWR(communityId ? `/api/communities/${communityId}` : null, fetcher);
  console.log(data)
  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCommunity;
