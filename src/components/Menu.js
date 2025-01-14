'use client';

import React from 'react';
import { Button } from './ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

const Menu = ({ onAddToCart }) => {
    const items = [
        {
            id: 1,
            name: 'Pizza Bolognese',
            desc: 'Delicious beef lasagna with double chili cheese',
            price: '₹50.00',
            img: '/menu/pizza.jpg',
        },
        {
            id: 2,
            name: 'Spaghetti Carbonara',
            desc: 'Creamy spaghetti with pancetta and parmesan',
            price: '₹45.00',
            img: '/menu/spaghetti.webp',
        },
        {
            id: 3,
            name: 'Vegetable Stir Fry',
            desc: 'Stir-fried veggies with a soy sauce glaze',
            price: '₹40.00',
            img: '/menu/stir_fry.jpeg',
        },
        {
            id: 4,
            name: 'Penne Arrabbiata',
            desc: 'Spicy penne pasta in a tomato-based sauce',
            price: '₹35.00',
            img: '/menu/penne_arrabbiata.jpg',
        },
        {
            id: 5,
            name: 'Caesar Salad',
            desc: 'Fresh romaine lettuce with creamy Caesar dressing and croutons',
            price: '₹30.00',
            img: '/menu/caesar_salad.jpeg',
        },
        {
            id: 6,
            name: 'Chicken Sandwich',
            desc: 'Juicy grilled chicken with lettuce, tomato, and mayo',
            price: '₹55.00',
            img: '/menu/grilled_chicken_sandwich.jpeg',
        },
    ];

    return (
        <div className="grid md:grid-cols-2 gap-5 w-full">
            {items.map((item) => (
                <div className="bg-white shadow-custom rounded-md px-5 py-5 h-[164px]" key={item.id}>
                    <div className="flex pb-1 gap-2">
                        <img src={item.img} alt="" className="w-28 h-20 rounded-sm" />
                        <div>
                            <h1 className="text-lg font-semibold">{item.name}</h1>
                            <p className="text-sm w-3/4">{item.desc}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">{item.price}</h1>
                        <div className="flex gap-5 items-center">
                            <Button onClick={() => onAddToCart(item)}>
                                <ShoppingCart />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Menu;
