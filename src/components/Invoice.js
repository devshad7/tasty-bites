'use client'

import React from 'react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import { addDoc, collection, doc, runTransaction } from 'firebase/firestore';
import { auth, db } from '@/config/firebase.config';
import toast from 'react-hot-toast';

const Invoice = ({ selectedItems, removeItem, table, setSelectedItems }) => {

    const user = auth.currentUser

    const calculateSubtotal = () => {
        return selectedItems.reduce((total, item) => total + parseFloat(item.price.slice(1)) * item.qty, 0);
    };

    const handlePlaceOrder = () => {
        const items = selectedItems.map((item) => ({
            name: item.name,
            qty: item.qty,
            price: item.price,
        }));

        const totalPrice = calculateSubtotal();

        // method to create the order id which is starting from #1001
    const counterDocRef = doc(db, 'counters', 'orderCounter');

    runTransaction(db, (transaction) => {
        return transaction.get(counterDocRef).then((counterDoc) => {
            if (!counterDoc.exists()) {
                throw new Error('Order counter does not exist!');
            }

            const latestOrderId = counterDoc.data().latestOrderId || 1000;
            const nextOrderId = latestOrderId + 1;
            
            transaction.update(counterDocRef, { latestOrderId: nextOrderId });

            return nextOrderId;
        });
    })
        .then((newOrderId) => {
            return addDoc(collection(db, 'orders'), {
                orderId: newOrderId,
                slug: `${newOrderId}`,
                customerName: user.displayName,
                customerEmail: user.email,
                userId: user.uid,
                tableNo: table.name,
                items: items,
                isCanceled: false,
                totalPrice: `₹${totalPrice}.00`,
                orderStatus: false,
                createdAt: new Date().toISOString(),
            });
        })
        .then(() => {
            toast.success('Order placed successfully');
            setSelectedItems([]);
        })
        .catch((err) => {
            toast.error('Something went wrong...');
            console.error(err.message);
        });
};

    return (
        <div className="w-full md:w-[40%] max-h-[549px]">
            <div className="h-auto bg-white shadow-custom rounded-md py-5 px-6">
                <div className="pb-3">
                    <h1 className="text-xl font-semibold">Invoice</h1>
                </div>
                <div className="flex flex-col gap-3 pb-3 max-h-[155px] md:max-h-[304px] overflow-scroll">
                    {selectedItems.length > 0 ? (
                        selectedItems.map((menu) => (
                            <div
                                className="w-full h-auto bg-main-card flex justify-between py-3 items-center px-5 rounded-md"
                                key={menu.id}
                            >
                                <div className="flex gap-2 items-start">
                                    <img src={menu.img} alt="" className="h-[44px] md:h-10 w-16 rounded" />
                                    <div className="leading-snug">
                                        <h1 className="text-sm md:text-[13px] font-semibold">{menu.name}</h1>
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs font-light">X{menu.qty}</span>
                                            <Trash size={14} className='cursor-pointer text-red-700' onClick={() => removeItem(menu.id)} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="font-semibold">{menu.price}</h1>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Selected Items</p>
                    )}
                </div>
                {selectedItems.length > 0 && (
                    <>
                        <div className="bg-main-card px-5 py-3 rounded-md">
                            <div className="pb-2">
                                <h1 className="text-lg font-semibold">Order Summary</h1>
                            </div>
                            <Separator />
                            <div className="mt-2 pb-2 flex flex-col gap-1">
                                <div className="flex justify-between text-xs">
                                    <h1>Sub Total</h1>
                                    <p>₹{calculateSubtotal().toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <h1>Total Items</h1>
                                    <p>{selectedItems.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Button className="w-full" onClick={handlePlaceOrder}>Place Order</Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Invoice;
