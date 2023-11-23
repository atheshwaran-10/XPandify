"use client"
import useCommunities from "@/hooks/useCommunities";
import ThemeSelector from "../ThemeSelector";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from '@/hooks/useCurrentUser';
import Input from "../Input";
import Modal from "../Modal";
import axios from "axios";
import useLoginModal from "@/hooks/useLoginModal";
import useCommunity from "@/hooks/useCommunity";
import UserAvatar from "../users/UserAvatar";
import { FileUpload } from "../FileUpload";
import useCommunityEditModal from "@/hooks/useCommunityEditModal";
import { Community } from "@prisma/client";

interface CommunityEditModalProps{
  community:Community
}

const CommunityEditModal:React.FC<CommunityEditModalProps> = ({community}) =>
{
  const editModal = useCommunityEditModal();
  const { data: currentUser } = useCurrentUser();
  const [name, setname] = useState('');
  const [desc, setdesc] = useState('');
  const [profileImage, setProfileImage] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ProfileView,SetProfileView]=useState(false);
  const { mutate: mutateCommunities } = useCommunities();
  const { mutate: mutateCommunity } = useCommunity(community.id as string);
  const loginModal=useLoginModal();

  const [selectedColor, setSelectedColor] = useState('deepskyblue');

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  useEffect(()=>{
    setProfileImage(community?.profileImage)
    setname(community?.name)
    setdesc(community?.description as string)
    setSelectedColor(community?.theme as string)
  },[community])

  

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
    else if(profileImage===null)
    {
      toast.error("Profile Image is Required")
      return
    }
    try 
    {
      setIsLoading(true);
      const communityData = {
        communityId:community.id,
        name: name,
        desc:desc,
        ownerId: currentUser.id,
        theme:selectedColor,
        profileImage: profileImage,
      };
      const response = await axios.patch('/api/addcommunity', communityData);
      const createdCommunity = response.data;
      setname('');
      setProfileImage(null)
      setdesc('')
      setSelectedColor('sky')
      mutateCommunities();
      mutateCommunity();
      toast.success("Community has been updated");
      editModal.onClose();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [name, profileImage,mutateCommunities,mutateCommunity, currentUser, setIsLoading, loginModal,desc,community.id,editModal,selectedColor]);



  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="cursor-pointer">
       {
        profileImage && !ProfileView ? (
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
      <div className="flex flex-row gap-x-5">
        <div className="flex flex-row gap-x-5">
         <ThemeSelector
          color="deepskyblue"
          isSelected={selectedColor === 'deepskyblue'}
          onSelectColor={handleColorSelect}
        />
        <ThemeSelector
          color="lime"
          isSelected={selectedColor === 'lime'}
          onSelectColor={handleColorSelect}
        />
        <ThemeSelector
          color="hotpink"
          isSelected={selectedColor === 'hotpink'}
          onSelectColor={handleColorSelect}
        />
        <ThemeSelector
          color="red"
          isSelected={selectedColor === 'red'}
          onSelectColor={handleColorSelect}
        />
        <ThemeSelector
          color="yellow"
          isSelected={selectedColor === 'yellow'}
          onSelectColor={handleColorSelect}
        />
         <ThemeSelector
          color="darkorange"
          isSelected={selectedColor === 'darkorange'}
          onSelectColor={handleColorSelect}
        />
      </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit Community"
      actionLabel="Edit Community"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default CommunityEditModal;
