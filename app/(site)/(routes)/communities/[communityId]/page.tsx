import React from 'react'
import CommunityHeader from './components/CommunityHeader'
import prisma from "@/libs/prismadb"
import Header from '@/components/Header'
import CommunityInfo from './components/CommunityInfo'
import CommunityPostFeed from '@/components/posts/CommunityPostFeed'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CommunityForm from './components/CommunityForm'

const page = async ({
  params
}: {
  params: { communityId: string; }
})  => {
  const community=await prisma.community.findFirst({
    where:{
      id:params.communityId
    }
  })
  const owner=await prisma.user.findFirst({
    where:{
      id:community?.ownerId
    }
  })


  const users=await prisma.user.findMany({
    where:{
      id:{
        in:community?.userIds
      }
    }
  })


  return (
    <div>
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
        <TabsContent value="about" className='text-md'><CommunityInfo community={community!} owner={owner!} users={users!}/></TabsContent>
      </Tabs>
    </div>
  )
}

export default page