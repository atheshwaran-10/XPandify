"use client"
import useCommunities from "@/hooks/useCommunities";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from '@/hooks/useCurrentUser';
import useAddModal from "@/hooks/useAddModal";
import Input from "../Input";
import Modal from "../Modal";
import axios from "axios";
import useLoginModal from "@/hooks/useLoginModal";
import useCommunity from "@/hooks/useCommunity";
import UserAvatar from "../users/UserAvatar";
import { FileUpload } from "../FileUpload";

interface AddModalProps{
  communityId?:string
}

const AddModal:React.FC<AddModalProps> = ({communityId}) =>
{
  const AddModal = useAddModal();
  const { data: currentUser } = useCurrentUser();
  const [name, setname] = useState('');
  const [desc, setdesc] = useState('');
  const [profileImage, setProfileImage] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);
   const [ProfileView,SetProfileView]=useState(false);
  const { mutate: mutateCommunities } = useCommunities();
  const { mutate: mutateCommunity } = useCommunity(communityId as string);
  const loginModal=useLoginModal();
  console.log(desc)
  const onSubmit = useCallback(async () => 
  {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }
    if(name==='')
    {
      toast.error("Community Name is Required")
      return
    }
    else if(desc==='')
    {
      toast.error("Description is Required")
      return
    }
    else if(profileImage==='')
    {
      toast.error("Profile Image is Required")
      return
    }
    try 
    {
      setIsLoading(true);
      const communityData = {
        name: name,
        desc:desc,
        ownerId: currentUser.id,
        profileImage: profileImage,
      };
      const response = await axios.post('/api/addcommunity', communityData);
      const createdCommunity = response.data;
      console.log(createdCommunity);
      mutateCommunities();
      mutateCommunity();
      toast.success("Community has been Created");
      AddModal.onClose();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [name, profileImage,mutateCommunities,mutateCommunity, currentUser, setIsLoading, loginModal, AddModal,desc]);



  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="cursor-pointer">
       {
        profileImage && ProfileView ? (
          <div  onClick={()=>SetProfileView(!ProfileView)} className="flex justify-center  px-3"  >
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
      </div>
      <Input 
        required={true}
        placeholder="Community Name"
        onChange={(e) => setname(e.target.value)}
        value={name}
        disabled={isLoading}  
      />
       <Input 
        required={true}
        placeholder="Community Description"
        onChange={(e) => setdesc(e.target.value)}
        value={desc}
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
