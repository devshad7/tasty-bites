import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Home = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center gap-5">
      <Link href={'/auth/login'}>
        <Button>Login</Button>
      </Link>
      <Link href={'/auth/signup'}>
        <Button>Sign Up</Button>
      </Link>
    </div>
  )
}

export default Home