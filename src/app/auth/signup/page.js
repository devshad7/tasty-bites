'use client'

import Signup from '@/components/Signup'
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
                <Signup />
            </div>
        </>
    )
}

export default page