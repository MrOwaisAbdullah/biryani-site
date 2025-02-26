'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from './toast';

interface MenuCardProps {
  item: Products;
}

export function MenuCard({ item }: MenuCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { dispatch } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    try {
      dispatch({
        type: "ADD_TO_CART",
        product: {
          _id: item._id,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: 1, // Default quantity is 1
          // slug: { current: product.slug.current || "" },
        },
      });
      showToast("Added to cart successfully!", "success");
    } catch (error) {
      showToast("Failed to add to cart. Please try again.", "error");
      console.error(error);
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      <div className="relative w-full aspect-square bg-gray-100">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-105 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsImageLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        {isImageLoading && (
          <div className="absolute inset-0">
            <div className="animate-pulse w-full h-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 background-animate" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 scale-105 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 flex flex-col min-h-[12rem]">
        <div className="flex justify-between items-start mb-2">
          {isImageLoading ? (
            <>
              <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <span className="text-sm font-bold text-primary whitespace-nowrap ml-2 bg-primary/5 px-2 py-1 rounded-full">
                ${item.price.toFixed(2)}
              </span>
            </>
          )}
        </div>
        
        {isImageLoading ? (
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>
        ) : (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>
        )}
        
        <div className="flex-1" />
        
        {isImageLoading ? (
          <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse" />
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-primary-foreground py-2.5 px-4 rounded-xl
                     flex items-center justify-center gap-2 font-medium
                     hover:opacity-90 transition-all duration-200 
                     active:scale-98 transform"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}