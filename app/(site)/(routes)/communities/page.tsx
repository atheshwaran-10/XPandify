import React from 'react'
import Header1 from './components/Header'
import AddModal from '@/components/modals/AddModal'
import Header from '@/components/Header'
const page = () => {
  return (
    <div>
      <Header label='Communities'/>
      <AddModal/>
      <Header1 />
    </div>
  )
}

export default page