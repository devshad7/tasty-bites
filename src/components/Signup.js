'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/config/firebase.config'
import toast from 'react-hot-toast'

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                const user = res.user
                updateProfile(user, {
                    displayName: name
                }).then((finalRes) => {
                    toast.success('Account created')
                    setLoading(false)
                }).catch((err) => {
                    setLoading(false)
                    console.log(err.message);
                    toast.error('Please try again...')
                })
                // console.log(user);
            }).catch((err) => {
                setLoading(false)
                console.log(err.message);
                if (err.message === 'Firebase: Error (auth/invalid-email).') {
                    toast.error('Enter a valid email')
                }
                else if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    toast.error('Use strong password...')
                }
                 else {
                    toast.error('Something went wrong...')
                }
            })
    }

    return (
        <>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create your account to get started.</CardDescription>
                </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="•••••••••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-4 w-4" />
                                    ) : (
                                        <EyeIcon className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full" onClick={handleSubmit} disabled={loading}>Sign Up</Button>
                        <p className="text-sm text-center">
                            Already have an account?{' '}
                            <Link href="/auth/login" className="underline">
                                Login
                            </Link>
                        </p>
                    </CardFooter>
            </Card >
        </>
    )
}

export default Signup