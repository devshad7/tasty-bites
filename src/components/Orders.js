'use client'

import React, { useEffect, useState } from 'react'
import OrdersCard from './OrdersCard'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/config/firebase.config';

const Orders = () => {

    const dbCollection = collection(db, "orders");
    
        const [data, setData] = useState([]);
    
        useEffect(() => {
            const q = query(dbCollection, orderBy("createdAt", "desc"));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const res = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setData(res);
            });
    
            return () => unsubscribe();
        }, []);

    return (
        <>
            <div className="px-8 md:px-28 py-10">
                <div className="max-w-3xl mx-auto">
                    <h1 className='text-2xl font-semibold'>Your Orders</h1>
                    <OrdersCard data={data} />
                </div>
            </div>
        </>
    )
}

export default Orders