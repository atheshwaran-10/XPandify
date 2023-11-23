"use client"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import UserAvatar from "../users/UserAvatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import Input from "../Input";
import Modal from "../Modal";
import useCommunity from "@/hooks/useCommunity";
import { FileUpload } from "../FileUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();
 
  const [profileImage, setProfileImage] = useState<string|null>(null);
  const [ProfileView,SetProfileView]=useState(false);
  const [coverImage, setCoverImage] = useState<string|null>(null);
  const [CoverView,SetCoverView]=useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  useEffect(() => {
    setProfileImage(currentUser?.profileImage)
    setCoverImage(currentUser?.coverImage)
    setName(currentUser?.name)
    setUsername(currentUser?.username)
    setBio(currentUser?.bio)
  }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);
  
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch('/api/edit', { name, username, bio, profileImage, coverImage });
      mutateFetchedUser();

      toast.success('Updated');

      editModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [editModal, name, username, bio, mutateFetchedUser, profileImage, coverImage]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
       {
        coverImage && !CoverView ? (
         <div>
          <div className="bg-neutral-700 h-44 relative">
              <Image src={coverImage} className="cursor-pointer" onClick={()=>SetCoverView(!CoverView)}  fill alt="Cover Image" style={{ objectFit: 'cover' }}/>
          </div>
        </div>
        )
        :(
          <div>
            <FileUpload  endpoint="postImage"
            onChange={(url) => {
              if (url) {
                setCoverImage(url)
                SetCoverView(!CoverView)
              }
            }} />
          </div>
        )
      }
      {
        profileImage && !ProfileView ? (
          <div  onClick={()=>SetProfileView(!ProfileView)} className="absolute pt-12 px-3"  >
            <UserAvatar img={profileImage} isLarge />
          </div>
        )
        :(
          <div>
            <FileUpload  endpoint="postImage"
            onChange={(url) => {
              if (url) {
                setProfileImage(url)
                SetProfileView(!ProfileView)
              }
            }} />
          </div>
        )
      }
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}  
      />
      <Input 
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading} 
      />
      <Input 
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading} 
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default EditModal;
