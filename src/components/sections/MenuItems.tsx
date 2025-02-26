import React from 'react'
import { MenuCard } from '../ui/menuCard';
import { client } from '@/sanity/lib/client';

const MenuItems = async ({categoryTitle}: { categoryTitle: string }) => {

      const query = `*[_type == "product" && category->title == $categoryTitle]{
      _id,
      title,
      description,
      tags,
      "image": image.asset->url,
      slug,
      price,
      badge
  }`

  const menuItems = await client.fetch(query, {categoryTitle});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      {menuItems.map((item: Products) => (
        <MenuCard key={item._id} item={item} />
      ))}
    </div>
  </div>
  
  )
}

export default MenuItems