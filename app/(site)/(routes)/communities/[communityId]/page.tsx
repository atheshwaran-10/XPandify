import React from 'react'
import CommunityHeader from './components/CommunityHeader'
import prisma from "@/libs/prismadb"
import Header from '@/components/Header'

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
  return (
    <div>
      <Header showBackArrow label={community?.name!}/>
      <CommunityHeader community={community!} />
    </div>
  )
}

export default page