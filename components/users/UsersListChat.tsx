"use client";
import { User } from "@prisma/client";
import React, { useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import UserBox from "./UserBox";
import { ClipLoader } from "react-spinners";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../ui/toggle";

interface UserListChatProps {
  items: User[];
  currentUser: User;
}
export const UserListChat: React.FC<UserListChatProps> = ({
  items,
  currentUser,
}) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  if (!currentUser?.emailVerified) router.push("/verify");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <aside className="">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold py-4 ml-6 flex  justify-between">
            New Conversation
            <ModeToggle/>
          </div>
        </div>
        {items.map((item: User) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};
export default UserListChat;
