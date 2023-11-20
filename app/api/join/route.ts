

import prisma from '@/libs/prismadb';
import { NextResponse } from "next/server";

export async function POST(req: Request) 
{
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return NextResponse.json("UnAuthorized")
  }
  const {userId,communityId}=await req.json();
  console.log(userId)
  console.log(communityId)

  try{
     const community = await prisma.community.findUnique({
      where: {
        id: communityId,
      },
    });

    if (!community) {
      return NextResponse.json("Not found");
    }
  
    
      const updatedCommunity = await prisma.community.update({
        where: {
          id: communityId,
        },
        data: {
          userIds: {
            push: userId, 
          },
        },
      });

       const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          communityIds: {
            push: communityId, 
          },
        },
      });

    return NextResponse.json(updatedCommunity);
  }
 
  catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function DELETE(req: Request) {
  const {userId,communityId}=await req.json();
  try
  {
     const community = await prisma.community.findUnique({
      where: {
        id: communityId,
      },
    });

    if (!community) {
      return NextResponse.json("Community Not Found")
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
        return NextResponse.json("User Not Found")
    }
  
      const updatedCommunity = await prisma.community.update({
        where: {
          id: communityId,
        },
        data: {
          userIds: {
            set: community.userIds.filter((id) => id !== userId), 
          },
        },
      });
       const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          communityIds: {
            set: user.communityIds.filter((id) => id !== communityId), 
          },
        },
      });

      return NextResponse.json(updatedCommunity);
  }
    catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
    
}