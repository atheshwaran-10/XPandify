import React from 'react'
import Avatar from "@/components/Avatar";
import { User } from '@prisma/client';
import NavBar from './NavBar';
interface NavHeroProps{
  user:User
}

const NavHero:React.FC<NavHeroProps> = ({
  user
}) => {
  return (
    <div className='flex flex-row gap-x-5'>
      <NavBar/>
      <Avatar userId={user.id}/>
      <h2 className='mt5 font-bold text-md'>{user.name}</h2>
    </div>
  )
}

export default NavHero