"use server"
import prisma from "@/libs/prismadb"

export const getCommunity=async(communityId:string)=>{
  try
  {
    const flag=await prisma.community.findFirst({
      where:{
        id:communityId
      }
    })

    return flag;
  }
  catch(e:any)
  {
    console.log("Error:"+e)
    return null;
  }
  
}