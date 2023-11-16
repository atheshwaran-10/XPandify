"use client"
import prisma from "@/libs/prismadb"
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from '@/hooks/useCurrentUser';
import useAddModal from "@/hooks/useAddModal";
import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";
import axios from "axios";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const AddModal = () =>
{
  const AddModal = useAddModal();
  const { data: currentUser } = useCurrentUser();
  const [name, setname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const loginModal=useLoginModal();
  const router=useRouter();
  const onSubmit = useCallback(async () => {
  if (!currentUser) {
    // Redirect to login if user is not logged in
    loginModal.onOpen();
    return;
  }

  try {
    setIsLoading(true);
   
    const communityData = {
      name: name,
      ownerId: currentUser.id,
      profileImage: profileImage,
    };
    const response = await axios.post('/api/addcommunity', communityData);
    const createdCommunity = response.data;
    console.log(createdCommunity);
    toast.success("Community has been Created");
    AddModal.onClose();
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong');
  } finally {
    setIsLoading(false);
  }
}, [name, profileImage, currentUser, setIsLoading, loginModal, AddModal]);



  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="cursor-pointer">
        <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" />
      </div>
      <Input 
        placeholder="Community Name"
        onChange={(e) => setname(e.target.value)}
        value={name}
        disabled={isLoading}  
      />
    </div>
  )

  

  return (
    <Modal
      disabled={isLoading}
      isOpen={AddModal.isOpen}
      title="Add Community"
      actionLabel="Add Community"
      onClose={AddModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default AddModal;
