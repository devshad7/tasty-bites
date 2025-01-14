'use client'

import Home from "@/components/Home";
import { auth } from "@/config/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {

  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard')
      }
    })
  }, [])

  return (
    <>
      <Home />
    </>
  );
}
