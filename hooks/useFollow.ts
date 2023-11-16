"use client"
import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);
  const [loading, setLoading] = useState(false);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      setLoading(true);

      if (isFollowing) {
        await axios.delete('/api/follow', { data: { userId } });
      } else {
        await axios.post('/api/follow', { userId });
      }

      setLoading(false);
      mutateCurrentUser();
      mutateFetchedUser();
      toast.success('Success');
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

  return {
    isFollowing,
    toggleFollow,
    loading,
  };
};

export default useFollow;


