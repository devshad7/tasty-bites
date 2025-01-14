'use client'

import Navbar from '@/components/Navbar';
import OrderDetail from '@/components/OrderDetail';
import { auth, db } from '@/config/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page({ params }) {

    const router = useRouter()
    const { slug } = React.use(params)

    const [data, setData] = useState([])
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        // fetch order details by the orderId slug
        const orderCollection = collection(db, 'orders');
        const q = query(orderCollection, where('slug', '==', slug));

        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const orderData = querySnapshot.docs[0].data();
                    setOrder({ id: querySnapshot.docs[0].id, ...orderData });
                } else {
                    // console.error('No order found with the given slug');
                }
                setLoading(false);
            },
            (error) => {
                console.error('Error fetching order:', error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [slug]);

    useEffect(() => {
        const getUser = onAuthStateChanged(auth, (user) => {
            if (user) {
                setData(user)
                // console.log(user);
            } else {
                router.push('/')
            }
        })

        return () => getUser()
    }, [])

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Navbar user={data} />
            <OrderDetail order={order} />
        </>
    )
}

export default page