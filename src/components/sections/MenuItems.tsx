import React from 'react'
import { MenuCard } from '../ui/menuCard';

const MenuItems = () => {
    const menuItems: Products[] = [
        {
          _id: "1",
          title: "Classic Margherita Pizza",
          description:
            "Fresh mozzarella, tomatoes, and basil on a crispy thin crust, drizzled with extra virgin olive oil",
          price: 14.99,
          image:
            "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=800&auto=format&fit=crop",
        },
        {
          _id: "2",
          title: "Grilled Salmon Bowl",
          description:
            "Fresh Atlantic salmon served with quinoa, roasted vegetables, and lemon herb sauce",
          price: 22.99,
          image:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop",
        },
        {
          _id: "3",
          title: "Truffle Mushroom Pasta",
          description:
            "Handmade fettuccine with wild mushrooms, truffle oil, and parmesan cheese",
          price: 18.99,
          image:
            "https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=800&auto=format&fit=crop",
        },
        {
          _id: "4",
          title: "Wagyu Beef Burger",
          description:
            "Premium wagyu beef patty with caramelized onions, aged cheddar, and special sauce",
          price: 24.99,
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
        },
        {
          _id: "5",
          title: "Wagyu Beef Burger",
          description:
            "Premium wagyu beef patty with caramelized onions, aged cheddar, and special sauce",
          price: 24.99,
          image:
            "/8.png",
        },
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      {menuItems.map((item) => (
        <MenuCard key={item._id} item={item} />
      ))}
    </div>
  </div>
  
  )
}

export default MenuItems