import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  
  const{body,communityId,userId,image}=await req.json();
  console.log(communityId)

 try {
    const newPost = await prisma.post.create({
      data: {
        body: body,
        userId: userId,
        image:image,
        communityIds: [communityId], 
      },
    });
   
    const updatedCommunity = await prisma.community.update({
      where: {
        id: communityId,
      },
      data: {
        posts: {
          connect: { id: newPost.id }, 
        },
      },
      include: {
        posts: true, 
      },
    });

    return NextResponse.json({ post: newPost, community: updatedCommunity });
  } 
  catch (error:any) {
    return NextResponse.json({ error: 'Error creating post', message: error });
  } 
}