"use client"
import { Community, User } from '@prisma/client'
import React from 'react'
import { Calendar,Users2Icon,Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'
import UsersView from './UsersView'
interface CommunityInfoProps{
  community:Community,
  owner:User
  users:User[]
}

const CommunityInfo:React.FC<CommunityInfoProps> = ({
  community,owner,users
}) => {
  const router=useRouter();
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
            {community.createdAt ? community.createdAt.toDateString() : null}
        </div>
        <div className='flex flex-row p-3 gap-5'>
            <Calendar/>
            Created at {community.createdAt ? community.createdAt.toDateString() : null} by
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