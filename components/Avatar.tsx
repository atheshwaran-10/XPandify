"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import useUser from "@/hooks/useUser";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  communityImage?: string;
  isCommunity?: boolean;
  communityId?: string;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder, isCommunity, communityImage, communityId }) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback((event: any) => {
    event.stopPropagation();
    const url = `/users/${userId}`;
    router.push(url);
  }, [router, userId]);

  const communityClick = useCallback((event: any) => {
    event.stopPropagation();
    const url = `/communities/${communityId}`;
    router.push(url);
  }, [router, communityId]);

  const handleClick = isCommunity ? communityClick : onClick;

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}
        alt="Avatar"
        onClick={handleClick}
        src={isCommunity ? communityImage || '/images/placeholder.png' : fetchedUser?.profileImage || '/images/placeholder.png'}
      />
    </div>
  );
}

export default Avatar;
