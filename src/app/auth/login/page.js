'use client'

import Login from '@/components/Login'
import { auth } from '@/config/firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {

    const router = useRouter()
    
      useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if(user) {
            router.push('/dashboard')
          }
        })
      }, [])

    return (
        <>
            <div className="h-screen w-full flex justify-center items-center px-4">
                <Login />
            </div>
        </>
    )
}

export default page