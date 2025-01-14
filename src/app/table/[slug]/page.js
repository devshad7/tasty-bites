'use client'

import Navbar from '@/components/Navbar';
import TableMenu from '@/components/TableMenu';
import { auth, db } from '@/config/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page({ params }) {

    const router = useRouter()
    const [data, setData] = useState([])

    const { slug } = React.use(params)
    const [table, setTable] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        // Fetch table data by slug
        const fetchTable = async () => {
            try {
                const tablesCollection = collection(db, 'tables');
                const q = query(tablesCollection, where('slug', '==', slug));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const tableData = querySnapshot.docs[0].data();
                    setTable({ id: querySnapshot.docs[0].id, ...tableData });
                } else {
                    console.error('No table found with the given slug');
                }
            } catch (error) {
                console.error('Error fetching table:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTable();
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

    if (!table) return <div>Table not found</div>;


    return (
        <>
            <Navbar user={data} />
            <TableMenu table={table} />
        </>
    )
}

export default page