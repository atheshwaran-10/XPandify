"use client"
import React, { useEffect, useState } from 'react';
import { Community } from '@prisma/client';
import { fetchUserProfiles } from '@/actions/fetchUserProfile';
import Image from 'next/image';
import img from "@/public/images/placeholder.png"

interface CommunityMembersProps {
  community: Community;
}

const CommunityMembers: React.FC<CommunityMembersProps> = ({ community }) => {
  const [userProfiles, setUserProfiles] = useState<string[]>([]);

  useEffect(() => {
    const fetch=async()=>{
      if (community.userIds.length > 0) 
      {
        const response =await fetchUserProfiles(community);
        setUserProfiles(response!)
      }
    }
    fetch();
  }, [community]);

  console.log(userProfiles)



  return (
    <div>
      <div className='flex flex-row gap-5 '>
        {userProfiles.map((profileImage, index) => (
          <div key={index} className='-mt-5'>
            <Image
              src={profileImage ? profileImage : img}
              alt={`User ${index + 1}`}
              height={40}
              width={40}
              className='rounded-full absolute'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityMembers;
