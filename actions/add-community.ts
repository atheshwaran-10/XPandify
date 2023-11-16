import prisma from '@/libs/prismadb';

export const addCommunity=async(
  userId:string,
  name:string
)=>{
  try{
    const f= await prisma.community.create({
      data:{
        ownerId:userId,
        name:name
      }
    })
    console.log(f)
    return true;
  }
  catch(e:any)
  {
    console.log("Error:"+e);
    return;
  }
}