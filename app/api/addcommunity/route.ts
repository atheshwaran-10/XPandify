import prisma from '@/libs/prismadb'; 
import { NextResponse } from 'next/server';

export  async function POST(req:Request) {

  const { name, ownerId, profileImage,desc,theme } =await req.json();

  try {
    const createdCommunity = await prisma.community.create({
      data: {
        name: name,
        description:desc,
        ownerId: ownerId,
        theme:theme,
        profileImage: profileImage,
        userIds:[ownerId]
      },
    });
     const updatedUser = await prisma.user.update({
        where: {
          id: ownerId,
        },
        data: {
          communityIds: {
            push: createdCommunity.id, 
          },
        },
      });

    return NextResponse.json(createdCommunity);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
export  async function PATCH(req:Request) {

  const {communityId, name, ownerId, profileImage,desc,theme } =await req.json();

  try {
    const updatedCommunity = await prisma.community.update({
      where: {
       id:communityId
      },
      data:{
        name: name,
        description:desc,
        ownerId: ownerId,
        theme:theme,
        profileImage: profileImage,
      }
    });


    

    return NextResponse.json(updatedCommunity);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
