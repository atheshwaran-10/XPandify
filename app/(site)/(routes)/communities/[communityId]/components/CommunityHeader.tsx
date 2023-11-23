"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Community } from '@prisma/client';
import CommunityMembers from '@/components/communityMembers';
import { Button } from '@/components/ui/button';
import useCommunityFollow from '@/hooks/useCommunityFollow';
import useCurrentUser from '@/hooks/useCurrentUser';
import Options from './options';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

interface CommunityHeaderProps {
  community: Community;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ community }) => {

  const { data: currentUser } = useCurrentUser();
  const { isFollowing, toggleFollow ,loading } = useCommunityFollow(currentUser?.id,community.id);
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };
 
  const handleMouseLeave = () => {
    setHovered(false);
  };

  

  console.log(currentUser?.id)
  console.log(community.ownerId)

  return (
    <div className=''>
      <div className="bg-neutral-700 h-60 relative">
        <Image src={community.profileImage!} fill alt="Cover Image" style={{ objectFit: 'cover' }}/>
      </div>
     <div className={clsx(`bg-${community.theme}-300`, 'h-2', 'w-full')} />
        <div className={clsx(`bg-${community.theme}-500`)} >
        <div className='font-extrabold text-4xl p-3'>
          {community.name}
        </div>
         <div className='p-4  flex flex-row'>
          <CommunityMembers community={community}/>
          <h2 className='pl-16 -mt-3'>
            {community.userIds.length} Members
          </h2>
          <div className='ml-auto border rounded-lg '>
              <Button
                disabled={loading}
                onClick={toggleFollow} 
                value={isFollowing ? 'Unfollow' : 'Follow'}
                variant={hovered ? (isFollowing ? 'destructive' : 'default') : (isFollowing ? 'ghost' : 'outline')}
                className={loading? " hover:cursor-wait" : "hover:cursor-pointer"+""}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
              {hovered ? (isFollowing ? 'Leave' : 'Join') : (isFollowing ? 'Joined' : 'Join')}
            </Button>
            </div>
            {
              
              currentUser?.id===community.ownerId && (
                <div className='px-5 rounded-xl'>
                  <Options community={community!}/>
                </div>
              )
            }
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
