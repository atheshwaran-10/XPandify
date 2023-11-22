import {  NextApiResponse } from "next";

import prisma from '@/libs/prismadb';


export const config = {
  api: {
    responseLimit: false,
  },
}


export default  async function handler(req: Request, res: NextApiResponse) 
{
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }
  try
  {
    const communities = await prisma.community.findMany();
    return  res.status(200).json(communities)
  } 
  catch(error) {
    console.log(error);
    return res.status(400).json(error);  
  }
}
