import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb';
import { authOptions } from "@/app/api/auth/[...nextauth]/authoptionsfile";
import { getServerSession } from 'next-auth';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  try
  {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return;
      //TODO:CHECK WHETHER IT WORK
      //throw new Error('Not signed in');
    } 

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      }
    });
     if (!currentUser) {
      throw new Error('User not found');
    }

    return { currentUser };
  }
  catch(e:any)
  {
    console.log(e);
    return;
  }
 
};

export default serverAuth;
