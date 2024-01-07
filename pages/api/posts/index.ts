import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    if (req.method === 'POST') {
      const currentUser = await serverAuth(req, res);
      const { body,image,video,audio} = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          image,
          video,
          audio,
          userId: currentUser?.currentUser.id!
        }
      });

      return res.status(200).json(post);
    }
    if (req.method === 'GET') 
    {
      const { userId } = req.query;

      let posts;

      if (userId && typeof userId === 'string') 
      {
        posts = await prisma.post.findMany(
        {
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
            Community: true 
          },
          orderBy: {
            createdAt: 'desc'
          },
        });
      } 
    else 
    {
      posts = await prisma.post.findMany({
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

    const filteredPosts = posts.filter(post => post.communityIds.length === 0);

    return res.status(200).json(filteredPosts);
  }

  } 
  catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
