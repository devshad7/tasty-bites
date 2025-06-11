'use client'

import React, { useState } from 'react'
import Menu from './Menu'
import { useCart } from '@/context/CartContext'

const TableMenu = ({ table }) => {

  const { handleAddToCart } = useCart()

  return (
    <>
      <div className="px-8 md:px-28 py-8">
        <div className="text-center flex flex-col gap-2">
          <h1 className='text-2xl md:text-3xl font-semibold'>All Available Items of Our Restaurants</h1>
          <h2 className='text-xl'>Please select your items</h2>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between gap-5 mt-8">
          <Menu onAddToCart={(item) => handleAddToCart(item, table)} />
        </div>
      </div>
    </>
  )
}

export default TableMenu