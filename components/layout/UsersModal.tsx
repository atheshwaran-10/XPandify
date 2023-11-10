"use client"
import useUsers from '@/hooks/useUsers';
import Avatar from '../Avatar';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const UsersModal = () => {
 const router = useRouter();
  const { data: users = [] } = useUsers();
  const [value, setValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  if (users.length === 0) {
    return null;
  }
 

  const searchUsers = () => {
    const filtered = users.filter((user: { username: string; }) => user.username.toLowerCase().includes(value.toLowerCase()));
    const filteredwithname = users.filter((user: { name: string; }) => user.name.toLowerCase().includes(value.toLowerCase()));
    const combinedFilteredUsers = Array.from(new Set([...filtered, ...filteredwithname]));
    setFilteredUsers(combinedFilteredUsers as never[]);
  };

  

  return (
    <div className="px-6 py-4  lg:block w-full h-screen">
      <div className="rounded-xl p-4 border shadow-md">
        <div className='flex flex-row gap-5 pb-6'>
          <h2 className="  text-xl font-semibold">Users</h2>
           <div className='flex flex-row gap-2 ml-auto justify-center'>
            <div>
              <Input
                type="search"
                placeholder="Search..."
                value={value}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchUsers();
                  }
                }}
                onChange={(e) => setValue(e.target.value)}
                className="md:w-[100px] lg:w-[300px]  "
              />
            </div>
        </div>
        </div>
        <div className="flex flex-col gap-6 mt-4">
          {
            filteredUsers.length===0 && (
              <div className='p-4 text-center'>
                No users found
              </div>
            )
          }
          {filteredUsers.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4 rounded-lg hover:cursor-pointer" onClick={()=>router.push(`users/${user.id}`)}>
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
               {/* <Button
                onClick={toggleFollow} 
                label={isFollowing ? 'Unfollow' : 'Follow'}
                secondary={!isFollowing}
                outline={isFollowing}
              /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersModal;
