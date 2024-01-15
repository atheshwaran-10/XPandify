"use client"
import React from 'react'
import { ArrowBack } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

const NavBar = () => {
  const router=useRouter();
  return (
    <div onClick={()=>router.push("/chat")} className='cursor-pointer'>
      <ArrowBack/>
    </div>
  )
}

export default NavBar