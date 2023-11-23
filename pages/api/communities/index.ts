import {  NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) 
{
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(400).json("UnAuthorized");
  }
  if(req.method=="GET")
  {
    try
    {
      const communities = await prisma.community.findMany();
      return  res.status(200).json(communities)
    } 
    catch(error) 
    {
      console.log(error);
      return res.status(400).json(error);
    } 
  } 
  if(req.method=="POST")
  {
    const {communityId}=req.body;
    try
    {
      await prisma.community.delete({
        where:{
          id:communityId,
        }
      })
      return res.json("Success")
    }
     catch(error) 
    {
      console.log(error);
      return res.status(400).json(error);
    } 
  }
}
