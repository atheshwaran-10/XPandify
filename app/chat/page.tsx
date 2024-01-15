
import React from "react";
import UserListChat from "@/components/users/UsersListChat";
import useUsers from "@/hooks/useUsers";
import getUsers from "@/actions/getUsers";
import getCurrentUser from "@/actions/getCurrentUser";
import { useRouter } from "next/router";

const page = async() => {
  const users = await getUsers();
  const currentUser=await getCurrentUser();



  if (users.length === 0) {
    return null;
  }


  return (
    <div className="w-full">
      <UserListChat items={users} currentUser={currentUser!} />
    </div>
  );
};

export default page;
