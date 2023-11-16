"use client"
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";
import { ModeToggle } from "./ui/toggle";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
}

const Header: React.FC<HeaderProps> = ({showBackArrow, label }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 pl-12">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && label!=="home" && (
          <BiArrowBack 
            onClick={handleBack}  
            size={20} 
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
          "/>
        )}
        <h1 className="pl-3  text-xl font-semibold">
          {label==="home" && (
            <div className="pl-5"></div>
          )}
          {label}
        </h1>
        <div className='ml-auto p-3'>
          <ModeToggle/>
        </div>
      </div>
    </div>
  );
}

export default Header;
