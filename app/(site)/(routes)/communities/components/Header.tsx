"use client"
import useCommunities from '@/hooks/useCommunities';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import useAddModal from '@/hooks/useAddModal';
import { Plus } from 'lucide-react';
import { Community, User } from '@prisma/client';
import CommunityBadge from './CommunityBadge';

const Header = () => {
  const { data: communities = [] } = useCommunities();
  const [value, setValue] = useState("");
  const addModal=useAddModal();

  




  return (
    <div className="px-6 py-4  lg:block w-full h-screen">
      <div className="rounded-xl p-4 border shadow-md">
        <div className='flex flex-row gap-5 pb-6'>
          <h2 className="  text-xl font-semibold"></h2>
           <div className='flex flex-row gap-2 justify-center w-full'>
            <div className='flex flex-row gap-5 w-full'>
              <Input
                type="search"
                placeholder="Search..."
                value={value}
                onChange={(e) => {
                setValue(e.target.value);
                }}
                className="md:w-[100px] lg:w-[300px] "
              />
              <div onClick={addModal.onOpen} className='cursor-pointer ml-auto flex flex-row hover:bg-slate-900 rounded-lg border py-1 px-2'>
                <Plus />
              </div>
            </div>
        </div>
        </div>
        <div className="flex flex-col gap-6 mt-4">
          {
            communities.length===0 && (
              <div className='p-4 text-center'>
                No Communities found
              </div>
            )
          }
          {communities.map((communtiy:Community) => (
            <CommunityBadge key={communtiy.id} communtiy={communtiy}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
