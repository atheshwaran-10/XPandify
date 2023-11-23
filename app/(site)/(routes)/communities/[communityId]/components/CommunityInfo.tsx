"use client"
import { Community, User } from '@prisma/client'
import React from 'react'
import { Calendar,Users2Icon,Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'
import UsersView from './UsersView'
import useUser from '@/hooks/useUser'
interface CommunityInfoProps{
  community:Community,
  users:User[]
}

const CommunityInfo:React.FC<CommunityInfoProps> = ({
  community,users
}) => {
  const router=useRouter();
  const {data:owner}=useUser(community.ownerId)
  return (
    <div>
      <h2 className='font-bold text-xl p-3'>Community Info</h2>
      <h2 className='p-3'>{community.description}</h2>
      <div className='p-3'>
         <div className='flex flex-row p-3 gap-5'>
            <Users2Icon/>
            Only members can post, like, or reply.
        </div>
         <div className='flex flex-row p-3 gap-5'>
            <Globe/>
            All Communities are publicly visible.
        </div>
        <div className='flex flex-row p-3 gap-5'>
            <Calendar/>
            Created at {community.createdAt ? new Date(community.createdAt).toDateString() : null} by
            <div className='font-bold font-xl hover:underline cursor-pointer -ml-[15px]' onClick={()=>router.push(`/users/${owner.id}`)}>
              @{owner.username}
            </div>
        </div>
        <hr
        className="
          opacity-100 
          peer-focus:opacity-100 
          h-[1px] 
          mt-2
          w-full 
          transition"
        />
      </div>
      <UsersView users={users!}/>
    </div>
  )
}

export default CommunityInfo