"use client";
import React from "react";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";
import useFollow from "@/hooks/useFollow";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Button } from "../ui/button";
import { User } from "@prisma/client";
interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { isFollowing, toggleFollow, loading } = useFollow(user.id);

  const handleFollow = () => {
    if (!currentUser.emailVerified) router.push("/verify");
    else toggleFollow();
  };

  return (
    <div key={user.id} className="flex flex-row gap-4 rounded-lg ">
      <Avatar userId={user.id} />
      <div
        className="flex flex-col hover:cursor-pointer"
        onClick={() => router.push(`users/${user.id}`)}
      >
        <p className="font-semibold text-sm">{user.name}</p>
        <p className="text-neutral-400 text-sm">@{user.username}</p>
      </div>
      {currentUser?.id === user.id ? (
        <></>
      ) : (
        <div className="ml-auto">
          <Button
            disabled={loading}
            onClick={handleFollow}
            value={isFollowing ? "Unfollow" : "Follow"}
            variant={isFollowing ? "outline" : "default"}
            className={loading ? " hover:cursor-wait" : "hover:cursor-pointer"}
          >
            {isFollowing ? <> Unfollow</> : <>Follow</>}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
