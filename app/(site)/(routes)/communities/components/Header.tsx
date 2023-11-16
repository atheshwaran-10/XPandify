"use client"
import useCommunities from '@/hooks/useCommunities';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import useFollow from '@/hooks/useFollow';
import { useEffect, useState } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/Avatar';
import useAddModal from '@/hooks/useAddModal';
import { Plus } from 'lucide-react';
import { User } from '@prisma/client';

const Header = () => {
 const router = useRouter();
  const { data: communities = [] } = useCommunities();
  const { data: currentUser } = useCurrentUser();
  const [value, setValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { isFollowing, toggleFollow ,loading } = useFollow(currentUser?.id);
  const addModal=useAddModal();

  
  useEffect(() => {
    const filtered = communities.filter((user:User) =>
      user.username?.toLowerCase().includes(value.toLowerCase()) ||
      user.name?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [setFilteredUsers,communities,value]);


  const searchUsers = () => {
    const filtered = communities.filter((user: { username: string; }) => user.username.toLowerCase().includes(value.toLowerCase()));
    const filteredwithname = communities.filter((user: { name: string; }) => user.name.toLowerCase().includes(value.toLowerCase()));
    const combinedFilteredUsers = Array.from(new Set([...filtered, ...filteredwithname]));
    setFilteredUsers(combinedFilteredUsers as never[]);
  };

  

  return (
    <div className="px-6 py-4  lg:block w-full h-screen">
      <div className="rounded-xl p-4 border shadow-md">
        <div className='flex flex-row gap-5 pb-6'>
          <h2 className="  text-xl font-semibold"></h2>
           <div className='flex flex-row gap-2 ml-auto justify-center'>
            <div className='flex flex-row gap-5'>
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
              <div onClick={addModal.onOpen} className='cursor-pointer mt-1'>
                <Plus />
              </div>
            </div>
        </div>
        </div>
        <div className="flex flex-col gap-6 mt-4">
          {
            filteredUsers.length===0 && (
              <div className='p-4 text-center'>
                No Communities found
              </div>
            )
          }
          {filteredUsers.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4 rounded-lg ">
              <Avatar userId='userid' communityId={user.id} isCommunity={true} communityImage={user.profileImage}/>
              <div className="flex flex-col hover:cursor-pointer" onClick={()=>router.push(`users/${user.id}`)}>
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">People Count:{user.userIds.length}</p>
              </div>
              {currentUser?.id === user.id ? (
                <></>
                ) : (
                  <div className='ml-auto'>
                    <Button
                      disabled={loading}
                      onClick={toggleFollow} 
                      value={isFollowing ? 'Unfollow' : 'Follow'}
                      variant={isFollowing ? "outline" : "default"}
                      className={loading? " hover:cursor-wait" : "hover:cursor-pointer"}
                    >
                    {isFollowing ? <> View</> : <>Join</>}
                  </Button>
                  </div>
                  
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
