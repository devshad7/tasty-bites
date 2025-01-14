'use client'

import React, { useState } from 'react'
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { db } from '@/config/firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { ChevronLeft, Printer } from 'lucide-react';
import { useRouter } from 'next/navigation';

const OrderDetail = ({ order }) => {

    // console.log(order);

    const router = useRouter()

    if (!order) {
        return <div className='px-8 md:px-28 py-10'>Order not found</div>
    }

    // order cancel function
    const handleOrderCancel = () => {
        const orderDoc = doc(db, 'orders', order.id)

        updateDoc(orderDoc, {
            isCanceled: true,
        }).then((res) => {
            toast.success('Order cancelled')
        }).catch((err) => {
            toast.error('Something went wrong...')
            console.log(err.message);
        })
    }

    return (
        <>
            <div className="px-8 md:px-28 py-10">
                <div className="max-w-3xl mx-auto">
                    <h1 className='text-2xl font-semibold flex items-center gap-2'>
                        <ChevronLeft onClick={() => router.push('/dashboard/orders')} className='cursor-pointer' />
                        Order details
                    </h1>
                    <div className="bg-white shadow-custom rounded-md mt-5 px-6 py-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h1 className='text-xl font-semibold'>Order #{order.orderId}</h1>
                            {order.isCanceled === false ? (
                                <Badge
                                    className={
                                        order.orderStatus === true
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-orange-100 text-orange-800'
                                    }
                                >
                                    {order.orderStatus === true ? 'successful' : 'preparing'}
                                </Badge>
                            ) : (
                                <Badge
                                    className={'bg-orange-100 text-orange-800'}
                                >
                                    Cancelled
                                </Badge>
                            )}
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Items</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {order.items.map((item, index) => (
                                    <li className="text-sm" key={index}>{item.qty + " " + item.name} → {item.price}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-x-2">
                            <span className="font-semibold">Total:</span>
                            <span>{order.totalPrice}.00</span>
                        </div>
                        <div className="space-x-2">
                            <span className="font-semibold">Ordered at:</span>
                            <span>{new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="space-x-2">
                            <span className="font-semibold">Status:</span>
                            {order.isCanceled === false ? (
                                <span>{order.orderStatus === true ? 'Successful' : 'Preparing'}</span>
                            ) : (
                                <span>Cancelled</span>
                            )}
                        </div>
                    </div>
                    {order.orderStatus === false ? (
                        order.isCanceled === false ? (
                            <Button className='bg-red-700 hover:bg-red-800 mt-5' onClick={handleOrderCancel}>Cancel Order</Button>
                        ) : ""
                    ) : ""}
                </div>
            </div>
        </>
    )
}

export default OrderDetail