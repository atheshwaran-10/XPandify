"use client"
import useUsers from '@/hooks/useUsers';
import Avatar from '../Avatar';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import useCurrentUser from "@/hooks/useCurrentUser";
const FollowBar = () => {

  const { data: users = [] } = useUsers();
  const router=useRouter();

  const { data: currentUser } = useCurrentUser();
  
  if (users.length === 0) {
    return null;
  }
  

  const filteredUsers=users.slice(1,6);
  if(currentUser)
    filteredUsers.filter((it:User)=>it.id!==currentUser.id)
 

  return (
    <div className="px-6 py-4  lg:block w-full h-screen">
      <div className=" rounded-xl p-4 border shadow-md">
        <h2 className="  text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {filteredUsers.map((user: User) => (
            <div
              key={user.id}
              className="flex flex-row gap-4 rounded-lg hover:cursor-pointer"
              onClick={() => router.push(`/users/${user.id}`)}
            >
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
