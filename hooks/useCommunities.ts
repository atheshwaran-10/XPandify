import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCommunities = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/myApi', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCommunities;
