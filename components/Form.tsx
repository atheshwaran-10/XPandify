"use client"
import axios from 'axios';
import { useCallback, useState } from 'react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { toast } from 'react-hot-toast';
import { useTheme } from 'next-themes';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from 'lucide-react';
import { BsEmojiSmile } from 'react-icons/bs';
import { FileUpload } from './FileUpload';
import Image from 'next/image';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';
import Avatar from './Avatar';
import Button from './Button';
import GifInput from './GifInput';
import { Editor } from './Editor';


const formSchema = z.object({
  description: z.string().min(1),
});

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}



const Forms: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');
  const [view,setView]=useState(false);
  const [emojiView,setEmojiView]=useState(false)
  const [image,setImage]=useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const {setTheme,theme}=useTheme();
  
  


  const onSubmit = useCallback(async (tempImage:string) => {
    try {
      setIsLoading(true);
      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';
      await axios.post(url, { body,image:tempImage });
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
  }, [body, mutatePosts, isComment, postId, mutatePost]);



  return (
    <div className="border-b-[1px] border px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <div>
              <Editor
              value={body}       
              onChange={setBody}
              />
            </div>
            
            
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
                    <ImageIcon className='cursor-pointer hover:bg-gray-200  dark:hover:bg-gray-700 rounded-full' color='#1D9BF0' size={22} onClick={()=>setView(true)}/>
                    <BsEmojiSmile className='cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full' color='#1D9BF0' size={22} onClick={()=>setEmojiView((prev)=>!prev)}/>
                    {
                      emojiView && (
                        <div className='mt-8 -ml-16 absolute z-20'>
                          <EmojiPicker theme={theme==='light' ? Theme.LIGHT : Theme.DARK} height={400} width={300} onEmojiClick={(e)=>setBody((prev)=>`${prev}${e.emoji}`)}/>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>

            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body} onClick={()=>{onSubmit(image!)}} label="Post" />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="  text-2xl text-center mb-4 font-bold">Welcome to Twitter</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Forms;
