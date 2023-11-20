"use client"
import { ClipLoader } from "react-spinners";
import Header from "@/components/Header";
import usePost from "@/hooks/usePost";

import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";

const PostView = ({
  params
}:{
  params:{postId:string}
}) => {
  const  postId = params.postId;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return ( 
    <>
      <Header showBackArrow  label="Posts" />
      <PostItem data={fetchedPost} />
      <Form postId={postId as string} isComment placeholder="Post your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
   );
}
 
export default PostView;