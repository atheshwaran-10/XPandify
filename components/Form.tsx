"use client"
import axios from 'axios';
import { useCallback, useState } from 'react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { toast } from 'react-hot-toast';
import { useTheme } from 'next-themes';
import * as z from "zod";
import { ImageIcon, VideoIcon, Headphones,Videotape } from "lucide-react";
import { BsEmojiSmile } from 'react-icons/bs';
import { FileUpload } from './FileUpload';
import Image from 'next/image';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import Player from './player/Player';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';
import Avatar from './Avatar';
import Button from './Button';
import MusicPlayer from './MusicPlayer';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';


const formSchema = z.object({
  description: z.string().min(1),
});

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
  user?:User
}



const Forms: React.FC<FormProps> = ({ placeholder, isComment, postId,user }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');


  const [videoView,setVideoView]=useState(false);
  const [audioView,setAudioView]=useState(false);
  const [ImageView,setImageView]=useState(false);
  const [emojiView,setEmojiView]=useState(false)




  const [image,setImage]=useState<string|null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const {theme}=useTheme();
  
  const router=useRouter();

  
  if (user && !user?.emailVerified) router.push("/verify");
  

  const onSubmit = useCallback(async (tempImage:string,tempVideo:string,tempAudio:string) => {
    try {
      setIsLoading(true);
      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';
      console.log("I"+tempVideo);
      await axios.post(url, { body,image:tempImage,video:tempVideo,audio:tempAudio });
      toast.success('Post created');
      setBody('');
      setImage(null)
      setAudio(null);
      setVideo(null);
      setAudioView(false);
      setVideoView(false);
      setImageView(false);
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
      {currentUser  ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
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
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                transition"
            />
            <div className="">
              {/* //!  Image Upload*/}
              {!image && ImageView ? (
                <div className="ml-auto">
                  <div className="flex flex-row-reverse justify-content-end ">
                    <Button
                      outline
                      onClick={() => setImageView(false)}
                      label="Cancel"
                    />
                  </div>
                  <FileUpload
                    endpoint="postImage"
                    onChange={(url) => {
                      if (url) {
                        setImage(url);
                      }
                    }}
                  />
                </div>
              ) : (
                ImageView &&
                image && (
                  <div className="flex justify-center items-center pt-5 -ml-6">
                    <Image
                      src={image!}
                      alt=""
                      height={480}
                      width={480}
                      className="rounded-lg"
                    />
                  </div>
                )
              )}

              {/* //!  Video  Upload*/}

              {!video && videoView ? (
                <div className="ml-auto">
                  <div className="flex flex-row-reverse justify-content-end ">
                    <Button
                      outline
                      onClick={() => setVideoView(false)}
                      label="Cancel"
                    />
                  </div>
                  <FileUpload
                    endpoint="postVideo"
                    onChange={(url) => {
                      if (url) {
                        setVideo(url);
                      }
                    }}
                  />
                </div>
              ) : (
                videoView &&
                video && (
                  <div className="h-[320px] w-[500px] z-10">
                    <Player
                      url={video}
                      light={
                        "https://images.unsplash.com/photo-1655601597743-7ddd6fdc2903?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80"
                      }
                    />
                  </div>
                )
              )}

              {/* //!  Audio Upload*/}

              {!audio && audioView ? (
                <div className="ml-auto">
                  <div className="flex flex-row-reverse justify-content-end ">
                    <Button
                      outline
                      onClick={() => setAudioView(false)}
                      label="Cancel"
                    />
                  </div>
                  <FileUpload
                    endpoint="postaudio"
                    onChange={(url) => {
                      if (url) {
                        setAudio(url);
                      }
                    }}
                  />
                </div>
              ) : (
                audioView &&
                audio && (
                  <div className="h-[320px] w-[500px] z-10">
                    <MusicPlayer url={audio}></MusicPlayer>
                  </div>
                )
              )}

              {/* //!  Initial Upload Form*/}

              {!ImageView && !videoView && !audioView && (
                <div className="mt-4 flex flex-row gap-2">
                  <ImageIcon
                    className="cursor-pointer hover:bg-gray-200  dark:hover:bg-gray-700 rounded-full"
                    color="#1D9BF0"
                    size={22}
                    onClick={() => setImageView(true)}
                  />
                  <VideoIcon
                    className="cursor-pointer hover:bg-gray-200  dark:hover:bg-gray-700 rounded-full"
                    color="#1D9BF0"
                    size={22}
                    onClick={() => setVideoView(true)}
                  />
                  <Headphones
                    className="cursor-pointer hover:bg-gray-200  dark:hover:bg-gray-700 rounded-full"
                    color="#1D9BF0"
                    size={22}
                    onClick={() => setAudioView(true)}
                  />

                  <BsEmojiSmile
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                    color="#1D9BF0"
                    size={22}
                    onClick={() => setEmojiView((prev) => !prev)}
                  />
                  {emojiView && (
                    <div className="mt-8 -ml-16 absolute z-20">
                      <EmojiPicker
                        theme={theme === "light" ? Theme.LIGHT : Theme.DARK}
                        height={400}
                        width={300}
                        onEmojiClick={(e) =>
                          setBody((prev) => `${prev}${e.emoji}`)
                        }
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                onClick={() => {
                  onSubmit(image!, video!, audio!);
                }}
                label="Post"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="  text-2xl text-center mb-4 font-bold">
            Welcome to Xpandify
          </h1>
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
