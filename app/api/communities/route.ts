import {  NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import { NextResponse } from "next/server";

export const config = {
  api: {
    responseLimit: false,
  },
}

export  async function GET(req: Request, res: NextApiResponse) 
{
  if (req.method !== 'POST' && req.method !== 'GET') {
    return NextResponse.json("UnAuthorized");
  }
  try
  {
    const communities = await prisma.community.findMany();
    return  NextResponse.json(communities)
  } 
  catch(error) {
    console.log(error);
     return NextResponse.json(error);
  }
}
