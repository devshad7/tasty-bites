'use client'


import Navbar from '@/components/Navbar'
import Orders from '@/components/Orders'
import Loader from '@/components/ui/loader'
import { auth } from '@/config/firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {

    const router = useRouter()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = onAuthStateChanged(auth, (user) => {
            if (user) {
                setData(user)
                // console.log(user);
                setLoading(false)
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
            <Orders />
        </>
    )
}

export default page