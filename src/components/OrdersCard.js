'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { auth } from '@/config/firebase.config'

const OrdersCard = ({ data }) => {

    const currentUser = auth.currentUser;

    // Filter orders of the logged in user
    const userOrders = data.filter((order) => order.userId === currentUser?.uid);

    // console.log(userOrders);

    return (
        <>
            <div className="mt-5 flex flex-col gap-2">
                {userOrders.length > 0 ? (
                    userOrders.map((order) => (
                        <div className="w-full bg-white shadow-custom rounded-md px-6 py-4" key={order.id}>
                            <div className="flex justify-between">
                                <Link href={`/dashboard/orders/${order.orderId}`} className="text-indigo-600 font-medium text-sm hover:underline">
                                    Order #{order.orderId}
                                </Link>
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
                            <span className="text-gray-500 text-sm font-medium">Total: {order.totalPrice}</span>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 mt-5">
                        No orders found for your account.
                    </div>
                )}
            </div>
        </>
    )
}

export default OrdersCard