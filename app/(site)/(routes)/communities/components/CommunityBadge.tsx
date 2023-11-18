"use client"
import Avatar from '@/components/Avatar'
import { Button } from '@/components/ui/button'
import useCurrentUser from '@/hooks/useCurrentUser'
import useCommunityFollow from '@/hooks/useCommunityFollow'
import { Community } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'


interface CommunityBadgeProps{
  communtiy:Community
}

const CommunityBadge:React.FC<CommunityBadgeProps> = ({communtiy}) => {
  const router=useRouter();
  const { data: currentUser } = useCurrentUser();
  const { isFollowing, toggleFollow ,loading } = useCommunityFollow(currentUser?.id,communtiy.id);
  return (
      <div key={communtiy.id} className="flex flex-row gap-4 rounded-lg ">
        <Avatar communityId={communtiy.id} isCommunity={true} communityImage={communtiy.profileImage!}/>
        <div className="flex flex-col hover:cursor-pointer" onClick={()=>router.push(`communities/${communtiy.id}`)}>
          <p className="font-semibold text-sm">{communtiy.name}</p>
          <p className="text-neutral-400 text-sm">People Count:{communtiy.userIds.length}</p>
        </div>
        {currentUser?.id === communtiy.id ? (
          <></>
          ) : (
            <div className='ml-auto'>
              <Button
                disabled={loading}
                onClick={toggleFollow} 
                value={isFollowing ? 'Unfollow' : 'Follow'}
                variant={isFollowing ? "destructive" : "default"}
                className={loading? " hover:cursor-wait" : "hover:cursor-pointer"}
              >
              {isFollowing ? <>Leave</> : <>Join</>}
            </Button>
            </div>
          )}
    </div>
  )
}
        

export default CommunityBadge