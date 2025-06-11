'use client'

import React from 'react'
import { Button } from './ui/button'
import { ShoppingCart, Trash } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useCart } from '@/context/CartContext'
import { auth, db } from '@/config/firebase.config'
import { addDoc, collection, doc, runTransaction } from 'firebase/firestore'
import toast from 'react-hot-toast'

const Cart = ({ table }) => {

    const { selectedItems, removeItem, setSelectedItems } = useCart()

    console.log(selectedItems);
    

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
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='secondary' className='border focus-visible:ring-offset-0 focus-visible:ring-0'><ShoppingCart />{selectedItems.length}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 mr-2 md:mr-0">
                    <DropdownMenuLabel>Cart</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className='text-sm'>
                        {selectedItems.length > 0 ? (
                            selectedItems.map((menu) => (
                                <div className='px-2 py-[6px] flex justify-between items-center' key={menu.id}>
                                    <div className="flex gap-2">
                                        <img src={menu.img} alt="" className='h-9 w-12 rounded-sm' />
                                        <div className="flex flex-col leading-4">
                                            <span>{menu.name}</span>
                                            <span>{menu.qty}x</span>
                                        </div>
                                    </div>
                                    <Trash size={16} className='text-red-500 cursor-pointer mr-4' onClick={() => removeItem(menu.id)} />
                                </div>
                            ))
                        ) : (
                            <div className='px-2 py-[6px] flex justify-center items-center text-gray-400'>
                                <span>Your cart is empty</span>
                            </div>
                        )}
                        <DropdownMenuSeparator />
                        <div className='px-2 flex justify-between items-center'>
                            <span>Order Summary</span>
                        </div>
                        <DropdownMenuSeparator />
                        <div className='py-[6px] px-2 flex flex-col gap-1'>
                            <div className="flex justify-between text-xs">
                                <h1>Sub Total</h1>
                                <p>₹{calculateSubtotal().toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-xs">
                                <h1>Total Items</h1>
                                <p>{selectedItems.length}</p>
                            </div>
                        </div>
                        <div className='py-2 px-2 flex justify-between items-center'>
                            <Button className="w-full" onClick={handlePlaceOrder}>Place Order</Button>
                        </div>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default Cart