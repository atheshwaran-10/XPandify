"use server"
import prisma from "@/libs/prismadb"
import { Community, User } from "@prisma/client";

export const fetchUserProfiles = async (community:Community) => {
    try {
      const userIds = community.userIds.slice(0, 3); 
      const users: User[] = await prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
      });

      const profileImages: string[] = users.map((user) => user.profileImage || '');
      
      return profileImages
    } 
    catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };
