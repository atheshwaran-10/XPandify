import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) 
{
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
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

export async function DELETE(req: Request, res: NextApiResponse) {
  const {userId,communityId}=await req.json();
  try
  {
     const community = await prisma.community.findUnique({
      where: {
        id: communityId,
      },
    });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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