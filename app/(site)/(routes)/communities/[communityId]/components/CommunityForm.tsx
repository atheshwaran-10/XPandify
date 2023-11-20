"use client"
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { toast } from 'react-hot-toast';
import { ImageIcon } from 'lucide-react';
import { BsEmojiSmile } from 'react-icons/bs';
import { FileUpload } from '@/components/FileUpload';
import Image from 'next/image';
import useCurrentUser from '@/hooks/useCurrentUser';
import useCommunityPosts from '@/hooks/useCommunityPosts';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import usePost from '@/hooks/usePost';

interface FormProps {
  communityId:string,
  placeholder: string;
  isComment?: boolean;
  postId?: string;
  userIds:string[]
}

const CommunityForm: React.FC<FormProps> = ({ placeholder, isComment, postId,communityId,userIds }) => {
  
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = useCommunityPosts(communityId);
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');
  const [view,setView]=useState(false);
  const [emojiView,setEmojiView]=useState(false)
  const [image,setImage]=useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async (tempImage:string|null) => {
    try {
      setIsLoading(true);
      const url = isComment ? `/api/comments?postId=${postId}` : '/api/CommunityPosts';
      await axios.post(url, { body,image:tempImage,communityId,userId:currentUser.id });
      toast.success('Post created');
      setBody('');
      setImage(null)
      setView(false);
      setEmojiView(false);
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost,communityId,currentUser?.id]);



  return (
    <div className="border-b-[1px] border px-5 py-2">
      {currentUser && userIds.includes(currentUser.id) ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) =>setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                bg-white dark:bg-black
                resize-none 
                mt-3 
                w-full 
                ring-0 
                outline-none 
                text-[20px] 
                border
                rounded-md
                p-3
              "
              placeholder={placeholder}>
            </textarea>
            <hr 
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                transition"
            />
             <div className="">
              {
                !image && view ? (
                  <div className='ml-auto'>
                    <div className='flex flex-row-reverse justify-content-end '>
                      <Button outline onClick={()=>setView(false)} label='Cancel'/>
                    </div>
                    <FileUpload  endpoint="postImage"
                      onChange={(url) => {
                        if (url) {
                          setImage(url)
                        }
                      }} />
                  </div>
                )
                :
                view && image &&
                (
                  <div className='flex justify-center items-center pt-6'>
                    <Image src={image!} alt='' height={80} width={80}/>
                  </div>
                )
              }
              {
                !view && (
                  <div className='mt-4 flex flex-row gap-2'>
                    <ImageIcon className='cursor-pointer hover:bg-gray-700 rounded-full' color='#1D9BF0' size={22} onClick={()=>setView(true)}/>
                    <BsEmojiSmile className='cursor-pointer hover:bg-gray-700 rounded-full' color='#1D9BF0' size={22} onClick={()=>setEmojiView((prev)=>!prev)}/>
                    {
                      emojiView && (
                        <div className='mt-8 -ml-16'>
                          <EmojiPicker height={400} width={300} onEmojiClick={(e)=>setBody((prev)=>prev+e.emoji)}/>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>

            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body} onClick={()=>{onSubmit(image)}} label="Post" />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-4">
          <h1 className="text-2xl text-center mb-4 font-bold">Join the community to post your thoughts</h1>
        </div>
      )}
    </div>
  );
};

export default CommunityForm;
