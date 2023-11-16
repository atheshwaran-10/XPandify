"use client"
import Form from '@/components/Form'
import Header from '@/components/Header'
import PostFeed from '@/components/posts/PostFeed'
import React from 'react'

const Mainc = () => {
  return (
    <>
     <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}

export default Mainc