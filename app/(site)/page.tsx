
import Form from '@/components/Form'
import Header from '@/components/Header'
import PostFeed from '@/components/posts/PostFeed'
import React from 'react'
import getCurrentUser from '@/actions/getCurrentUser'


const Mainc = async() => {
  const currentUser=await getCurrentUser();
  return (
    <>
     <Header label="Home" />
      <Form placeholder="What's happening?" user={currentUser!} />
      <PostFeed />
    </>
  )
}

export default Mainc