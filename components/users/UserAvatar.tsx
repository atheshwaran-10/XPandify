"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import useUser from "@/hooks/useUser";

interface UserAvatarProps {
  img:string
  isLarge?: boolean;
  hasBorder?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ img ,hasBorder,isLarge}) => {
  


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
        alt="UserAvatar"
        src={img}
      />
    </div>
  );
}

export default UserAvatar;
