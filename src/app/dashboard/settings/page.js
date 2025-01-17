'use client'

import Navbar from '@/components/Navbar'
import Settings from '@/components/Settings'
import Loader from '@/components/ui/loader'
import { auth } from '@/config/firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {

  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const getUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false)
        setData(user)
      } else {
        router.push('/')
      }
    })

    return () => getUser()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Navbar user={data} />
      <Settings user={data} />
    </>
  )
}

export default page