import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { communityId } = req.query;

    if (!communityId || typeof communityId !== 'string') {
      throw new Error('Invalid ID');
    }

    const community=await prisma.community.findFirst({
      where:{
        id:communityId
      }
    })
    const users=await prisma.user.findMany({
      where:{
        id:{
          in:community?.userIds
        }
      }
    })


    

    return res.status(200).json( users);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};
