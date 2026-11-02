"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';
type Props = {
  name:string,
  image:string,
  email:string
}
function UserTag({user}:{user:Props}) {
    //const {data:session}=useSession();
  return (
    <div className='flex flex-col'>
       {user?
       <div className='flex gap-3 
       items-center'>
       <Image loading='eager' src={user?.image} 
       alt='userImage'
       width={45}
       height={45}
       className='rounded-full'/>
       <div>
        <h2 className='text-[14px] font-medium'>{user?.name}</h2>
        <h2 className='text-[12px]'>{user?.email}</h2>

        </div>
       </div>
       :null}
    </div>
  )
}

export default UserTag