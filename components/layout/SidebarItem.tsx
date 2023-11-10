import React, { useCallback } from 'react';
import { IconType } from "react-icons";
import { useRouter } from 'next/router';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { BsDot } from 'react-icons/bs';

interface SidebarItemProps {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, href, auth, onClick, alert }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, auth, loginModal, onClick, currentUser]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center rounded-lg
        hover:cursor-pointer  
      hover:bg-slate-300 
        hover:bg-opacity-10 ">
      <div className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        cursor-pointer 
      ">
        <Icon size={28} color="" />
        {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
      </div>
      <div className="
        relative 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        cursor-pointer
        items-center
      ">
        <p className="text-xl">
          {label}
        </p>
        {alert ? <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} /> : null}
      </div>
    </div>
  );
}

export default SidebarItem;