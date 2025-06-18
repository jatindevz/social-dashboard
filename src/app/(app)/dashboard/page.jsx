'use client'
import { useSession } from 'next-auth/react';
import React from 'react'

const Dashboard = () => {
    const {data: session} = useSession();
  return (
      <div>
          <h1>Dashboard</h1>
          <p>Username: {session?.user?.name}</p>
          <p>Email: {session?.user?.email}</p>
          <p>Profile Picture: {session?.user?.profilePicture}</p>
          <p>Bio: {session?.user?.bio}</p>
          <p>Institution: {session?.user?.institution}</p>
    </div>
  )
}

export default Dashboard