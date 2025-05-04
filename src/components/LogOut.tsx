"use client"

import { signOut } from 'next-auth/react'
import React from 'react'

export default function LogOut() {
  return (
      <button className="bg-[var(--button-bg)] rounded-sm hover:shadow-xl text-white hover:cursor-pointer p-2 w-full" onClick={()=>signOut()}>Logout</button>

  )
}
