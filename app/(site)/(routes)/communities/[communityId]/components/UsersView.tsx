"use client"
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import UserProfile from '@/components/layout/UserProfile';
import { User } from '@prisma/client';

interface UsersViewProps{
  users:User[]
}

const UsersView:React.FC<UsersViewProps> = ({
  users
}) => {
 
  const [value, setValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]|[]>([]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users,setFilteredUsers]);

 
 

 const searchUsers = () => {
  const filtered = users.filter((user: { 
    username: string | null;
    name: string | null;
  }) => {
    const lowercaseValue = value.toLowerCase();
    return (
      (user.username && user.username.toLowerCase().includes(lowercaseValue)) ||
      (user.name && user.name.toLowerCase().includes(lowercaseValue))
    );
  });

  setFilteredUsers(filtered as never[]);
};

  

  return (
    <div className="px-6 py-4  lg:block w-full h-screen">
      <div className="rounded-xl  shadow-md">
        <div className='flex flex-row gap-5 pb-6'>
          <h2 className="  text-xl font-semibold">Members</h2>
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
               onChange={(e) => {
                setValue(e.target.value);
                searchUsers();
              }}
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
          {filteredUsers.map((user:User) => (
            <UserProfile key={user.id} user={user!}/>
          ))} 
        </div>
      </div>
    </div>
  );
};

export default UsersView;
