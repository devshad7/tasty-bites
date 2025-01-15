import React, { useState } from 'react'
import { Separator } from './ui/separator'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { sendEmailVerification, updateProfile } from 'firebase/auth'
import toast from 'react-hot-toast'
import { auth } from '@/config/firebase.config'

const ProfileSettings = ({ user }) => {

    const [name, setName] = useState('')

    const handleVerify = () => {
        sendEmailVerification(auth.currentUser)
            .then((res) => {
                toast.success('Verification link sent. Check you email...')
            }).catch((err) => {
                console.log(err.message);
                toast.error('Something went wrong...')
            })
    }

    // handle name update
    const handleUpdate = () => {
        updateProfile(auth.currentUser, {
            displayName: name,
        }).then((res) => {
            toast.success('Updated name...')
        }).catch((err) => {
            console.log(err.message)
            toast.error('Something went wrong while updating...')
        })
    }

    return (
        <>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl md:text-lg font-medium">Profile</h3>
                    <p className="text-md md:text-sm text-muted-foreground">
                        Edit your profile details from here
                    </p>
                </div>
                <Separator />
                <div className="space-y-8">
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={user.displayName}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormDescription>
                            This is your public display name. It can be your real name or a
                            pseudonym. You can only change this once every 30 days.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>

                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Input placeholder={user.email} disabled />
                        <FormDescription>
                            {user.emailVerified === false ? (
                                <span>Your email is not varified. <span className='underline cursor-pointer' onClick={handleVerify}>Click to verify</span></span>
                            ) : (
                                <span>You cannot change your email</span>
                            )}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    <Button
                        onClick={handleUpdate}
                        disabled={name === '' ? true : false}
                    >
                        Update profile
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ProfileSettings