import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
 var a= await prisma.post.deleteMany();
 console.log(a)
};

seed();
