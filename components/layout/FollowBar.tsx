import useUsers from '@/hooks/useUsers';

import Avatar from '../Avatar';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFollow from "@/hooks/useFollow";
import Button from '../Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const FollowBar = () => {

  const { data: users = [] } = useUsers();
  const router=useRouter();

  if (users.length === 0) {
    return null;
  }
 

  return (
    <div className="px-6 py-4  lg:block w-full h-screen">
      <div className=" rounded-xl p-4 border shadow-md">
        <h2 className="  text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4 rounded-lg hover:cursor-pointer" onClick={()=>router.push(`/users/${user.id}`)}>
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="  font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
