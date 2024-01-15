import { useRouter } from "next/navigation";
import { User } from "@prisma/client"
import Avatar from "../Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import { useCallback, useState } from "react";


interface UserBoxProps {
  data: User;
}

export const UserBox: React.FC<UserBoxProps> = ({ data}) => {
  const router = useRouter();
   const { data: currentUser } = useCurrentUser();
   const [loading,setLoading]=useState(false);
  
  const handleClick = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/conversations", { userId: data.id })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setLoading(false));
  }, [data, router]);

  return (
    <>
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          p-3 
          hover:bg-neutral-100
          dark:hover:bg-neutral-800
          rounded-lg
          transition
          cursor-pointer
          border-lg
        "
      >
        <Avatar userId={data.id} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium ">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
