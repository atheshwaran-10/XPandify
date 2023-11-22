import {  NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import { NextResponse } from "next/server";

export  async function GET(req: Request, res: NextApiResponse) 
{
  try{
    const communities = await prisma.community.findMany();
    return  NextResponse.json(communities)
  } 
  catch(error) {
    console.log(error);
    return NextResponse.json(error)
  }
}
