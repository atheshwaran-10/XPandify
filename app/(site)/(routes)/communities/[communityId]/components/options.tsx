"use client"

import * as React from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Community } from "@prisma/client"


interface OptionsProps{

  community:Community
}


const Options: React.FC<OptionsProps> = ({ community }) => {

  const router=useRouter()
  const communityId=community.id;
  const handleRemove=async()=>{
  try
  {
    const res= await axios.post("/api/communities",{communityId})
    toast.success("Community Removed")
    router.push("/communities")
    
  }
  catch(e:any)
  {
    toast.error("Something went wrong")
  }

}
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`rounded-full hover:bg-${community.theme}-300`}><BsThreeDotsVertical/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-35">
          <div  className="p-1 cursor-pointer hover:text-gray-400">
            Edit
          </div>
        <DropdownMenuSeparator />
        <div onClick={handleRemove} className="p-1 cursor-pointer hover:text-gray-400">
            Delete
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Options;