import React from 'react'
import { MenuCard } from '../ui/menuCard'
import { Flame } from 'lucide-react';
import ProductCard from '../ui/productCard';
import { client } from '@/sanity/lib/client';

const PopularItems = async () => {
  const query = `*[_type == "product" && badge== "Popular" ]{
  _id,
    title,
    price,
    "image" : image.asset->url,
    slug
}`
  const popularItems = await client.fetch(query)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="flex items-center gap-1 text-2xl font-bold text-gray-900 py-2"><Flame className='text-primary' size={24} fill="#f48d2b"/> Popular Items</h2>
    <p className="text-gray-600 mb-3 ml-3">
      Most Ordered Right Now</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      {popularItems.map((item: Products) => (
        <ProductCard key={item._id} item={item} />
      ))}
    </div>
  </div>
  )
}

export default PopularItems