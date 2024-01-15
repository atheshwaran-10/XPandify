"use client";
import { useCallback, useMemo, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";
import { MessageCircleIcon } from "lucide-react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";
import { Button } from "../ui/button";
import useOtherUser from "@/hooks/useOtherUser";
import { useRouter } from "next/navigation";
import axios from "axios";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const [loading2,setLoading]=useState(false);
 

  const editModal = useEditModal();
  const router = useRouter();

  const { isFollowing, toggleFollow, loading } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  const handleFollow = () => {
    if (!currentUser.emailVerified) router.push("/verify");
    else toggleFollow();
  };

  const handleClick = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/conversations", { userId: userId })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setLoading(false));
  }, [userId, router]);



  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button variant="secondary" value="Edit" onClick={editModal.onOpen}>
            Edit Profile
          </Button>
        ) : (
          <div className="flex flex-row gap-x-5">
            <Button
              disabled={loading}
              onClick={handleFollow}
              value={isFollowing ? "Unfollow" : "Follow"}
              variant={isFollowing ? "outline" : "secondary"}
              className={
                loading ? " hover:cursor-wait" : "hover:cursor-pointer"
              }
            >
              {isFollowing ? <> Unfollow</> : <>Follow</>}
            </Button>

            <Button disabled={loading || loading2} variant="outline" onClick={handleClick}>
              <MessageCircleIcon />
            </Button>
          </div>
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="  text-2xl font-semibold">{fetchedUser?.name}</p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className=" ">{fetchedUser?.bio}</p>
          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          "
          >
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className=" ">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className=" ">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
