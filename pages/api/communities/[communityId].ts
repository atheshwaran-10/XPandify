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

    console.log("GETTING")
   

    const community = await prisma.community.findUnique({
      where: {
        id: communityId
      }
    });

  

    return res.status(200).json(community);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};
