import prisma from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';


export const config = {
  api: {
    responseLimit: false,
  },
}

export default  async function handler(req: NextApiRequest,res:NextApiResponse) {
  
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }
  try 
  {
    if (req.method === 'POST') 
    {
        const{body,communityId,userId,image}= req.body;
        console.log(communityId)

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
        return res.status(200).json(newPost)
    }
    if(req.method==="GET")
    {
      
        const { communityId,userId } =  req.query;

        if (!communityId ) {
          return res.status(200).json({ error: 'Community ID is required' });
        }
        let posts;
        if (userId && typeof userId === 'string') 
        {
            posts = await prisma.post.findMany({
            where: {
              userId,
              communityIds: { has: communityId as string },
            },
            include: {
              user: true,
              comments: true,
              Community:true,
            },
            orderBy: {
              createdAt: 'desc'
            },
            });
        } 
        else 
        {
          posts = await prisma.post.findMany({
             where: {
              communityIds: { has: communityId as string },
            },
            include: {
              user: true,
              comments: true,
              Community: true 
            },
            orderBy: {
              createdAt: 'desc'
            }
          });
        }
        return  res.status(200).json(posts);
    }
  }
  catch(e:any)
  {
    console.log(e);
    return res.status(400).json(e);
  }
      

}
