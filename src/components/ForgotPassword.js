'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/config/firebase.config'
import toast from 'react-hot-toast'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        setLoading(true)
        sendPasswordResetEmail(auth, email)
            .then((res) => {
                setEmail('')
                setLoading(false)
                toast.success('Check your email...')
            }).catch((err) => {
                setLoading(false)
                console.log(err.message);
                toast.error('Something went wrong...')
            })
    }

    return (
        <>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>Enter your email to reset the password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full" onClick={handleSubmit} disabled={loading}>Send Reset Link</Button>
                    <p className="text-sm text-center">
                        Go back?{' '}
                        <Link href="/auth/login" className="underline">
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </>
    )
}

export default ForgotPassword