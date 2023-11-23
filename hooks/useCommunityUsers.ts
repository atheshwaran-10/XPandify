import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCommunityUsers = (communityId:string) => {
  const { data, error, isLoading, mutate } = useSWR(`/api/communityUsers/${communityId}`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCommunityUsers;
