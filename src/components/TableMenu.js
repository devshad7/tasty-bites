'use client'

import React, { useState } from 'react'
import Invoice from './Invoice'
import Menu from './Menu'

const TableMenu = ({ table }) => {

    const [selectedItems, setSelectedItems] = useState([]);

  const handleAddToCart = (item) => {
    const existingItem = selectedItems.find((i) => i.id === item.id);

    if (existingItem) {
      setSelectedItems(
        selectedItems.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, qty: 1 }]);
    }
  };

  // Function to remove an item from the invoice
  const removeItem = (itemId) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
};

    return (
        <>
            <div className="px-8 md:px-28 py-8">
                <div className="text-center flex flex-col gap-2">
                    <h1 className='text-2xl md:text-3xl font-semibold'>All Available Items of Our Restaurants</h1>
                    <h2 className='text-xl'>Please select your items</h2>
                </div>
                <div className="flex flex-col-reverse md:flex-row justify-between gap-5 mt-8">
                    <Menu onAddToCart={handleAddToCart} />
                    <Invoice selectedItems={selectedItems} removeItem={removeItem} table={table} setSelectedItems={setSelectedItems} />
                </div>
            </div>
        </>
    )
}

export default TableMenu