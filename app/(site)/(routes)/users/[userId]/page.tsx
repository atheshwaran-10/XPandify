"use client"
import { ClipLoader } from "react-spinners";
import useUser from "@/hooks/useUser";
import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";

const UserView =  ({
  params
}: {
  params: { userId: string; }
})  => {
  const { data: fetchedUser, isLoading } = useUser(params.userId);
  
  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={params.userId as string} />
      <UserBio userId={params.userId as string} />
      <PostFeed userId={params.userId as string} />
    </>
   );
}
 
export default UserView;