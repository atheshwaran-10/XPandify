import prisma from '@/libs/prismadb'; 
import { NextResponse } from 'next/server';

export  async function POST(req:Request) {

  const { name, ownerId, profileImage } =await req.json();

  try {
    const createdCommunity = await prisma.community.create({
      data: {
        name: name,
        ownerId: ownerId,
        profileImage: profileImage,
        userIds:[ownerId]
      },
    });

    return NextResponse.json(createdCommunity);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
