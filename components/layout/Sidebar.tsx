import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser,FaSearch } from 'react-icons/fa';
import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
     {
      icon: FaSearch,
      label: 'Search',
      href: '/search',
    },
    {
      icon: BsBellFill,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },

  ]

  return (
    <div className="md:flex col-span-1 h-full pt-3 md:pt-1 ">
        <div className="flex flex-col items-center ">
          <div className="space-y-2 lg:w-[230px]">
            <div className='flex flex-row'>
              <SidebarLogo />
            </div>
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                alert={item.alert}
                auth={item.auth}
                href={item.href} 
                icon={item.icon} 
                label={item.label}
              />
            ))}
            {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
            <SidebarTweetButton />
          </div>
        </div>
      </div>
  )
};

export default Sidebar;
