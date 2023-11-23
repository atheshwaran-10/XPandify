"use client"
import React from 'react'
import CommunityHeader from './components/CommunityHeader'
import Header from '@/components/Header'
import CommunityInfo from './components/CommunityInfo'
import CommunityPostFeed from '@/components/posts/CommunityPostFeed'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CommunityForm from './components/CommunityForm'
import CommunityEditModal from '@/components/modals/CommunityEditModal'
import useCommunity from '@/hooks/useCommunity'
import useUser from '@/hooks/useUser'
import useCommunityUsers from '@/hooks/useCommunityUsers'
import { User } from '@prisma/client'
import { ClipLoader } from 'react-spinners'
const Page =  ({
  params
}: {
  params: { communityId: string; }
})  => {

  const {data:community,isLoading}=useCommunity(params.communityId)
  const {data:users=[],isLoading:userLoading}=useCommunityUsers(params.communityId)
 
  


  return (
    <>
    {
      !isLoading && !userLoading ? (
    <div>
      <CommunityEditModal community={community!}/>
      <Header showBackArrow label={community?.name!}/>
      <CommunityHeader community={community!} />
      <Tabs defaultValue="posts" className="w-full">
      <TabsList className='mt-2'>
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>
      <hr 
      className="
        opacity-100 
        peer-focus:opacity-100 
        h-[1px] 
        mt-2
        w-full 
        transition"
      />
        <TabsContent value="posts" className='text-md'>
          <CommunityForm userIds={community?.userIds!} communityId={community?.id!} placeholder="What's happening?" />
          <CommunityPostFeed communityId={community?.id!}/>
        </TabsContent>
        <TabsContent value="about" className='text-md'><CommunityInfo community={community!}  users={users!}/></TabsContent>
      </Tabs>
    </div>
    )
    :
    (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    
    )
    }
    </>
  )
}

export default Page