'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/config/firebase.config';
import Link from 'next/link';

const Dashboard = () => {
    const dbCollection = collection(db, "tables");

    const [data, setData] = useState([]);

    useEffect(() => {
        const q = query(dbCollection, orderBy("createdAt", "asc"));
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
            <div className="flex flex-col items-center px-8 md:px-28 py-10">
                <div className="text-center flex flex-col gap-2">
                    <h1 className='text-2xl md:text-3xl font-semibold'>Welcome to Our Restaurant</h1>
                    <h2 className='text-xl'>Please select a table</h2>
                </div>
                <div className="mt-8 md:mt-14 flex gap-5 md:gap-10 flex-wrap justify-center">
                    {data.length > 0 ? (
                        data.map((table) => (
                            <div className="flex justify-center flex-col w-full md:w-80 h-40 bg-white shadow-custom px-7 py-5 rounded-md" key={table.id}>
                                <h1 className='text-2xl font-semibold'>{table.name}</h1>
                                <span className={table.status === true ? 'text-green-600 pb-3' : 'text-orange-600 pb-3'}>
                                    {table.status === true ? 'Available' : 'Occupied'}
                                </span>
                                {table.status === true ? (
                                    <Link href={`/table/${table.slug}`}>
                                        <Button className={'w-1/2'}>
                                            Reserve
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button className={'w-1/2'} disabled>
                                        Reserve
                                    </Button>
                                )}
                            </div>
                        ))
                    ) : (
                        <span>No tables are available as of now. Thank you ☺️</span>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
