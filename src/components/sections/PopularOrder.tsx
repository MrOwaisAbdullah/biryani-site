"use client"

import { useCart } from "@/context/CartContext"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useToast } from "../ui/toast"

const popularItems = [
  // BIRYANI CATEGORY
  {
    _id: '2axI5gVoS4Ac0D04GqDk8V',
    title: 'Tikka Biryani 1 Kg',
    description: 'Delicious tikka biryani, 1kg serving',
    price: 560,
    image: '/images/products/tikka_biryani1.png',

  },

  {
    _id: '7ZYoFXxWQ3MIUIVrDMUpVv',
    title: 'Tikka Biryani Sada 1 Kg',
    description: 'Simple tikka biryani without extra spices, 1kg serving',
    price: 400,
    image: '/images/products/tikka_biryani_sada1.png',
  },
  
  // PULAO CATEGORY
  {
    _id: '2axI5gVoS4Ac0D04GqDlB0',
    title: 'Beef Pulao 1 Kg',
    description: 'Flavorful beef pulao, 1kg serving',
    price: 620,
    image: '/images/products/beef_pulao1.png',

  },
  {
    _id: '7ZYoFXxWQ3MIUIVrDMUq37',
    title: 'Sada Pulao 1 Kg',
    description: 'Simple plain rice pulao, 1kg serving',
    price: 400,
    image: '/images/products/sada_pulao1.png',
  },
  
  // EXTRAS CATEGORY
  {
    _id: '2axI5gVoS4Ac0D04GqDnvc',
    title: 'Badami Kheer',
    description: 'Sweet almond rice pudding',
    price: 120,
    image: '/images/products/badami_kheer.png',

  },
  {
    _id: 'TZh06If8UWMtw7RfxYfUAp',
    title: 'Extra Fried Onion',
    description: 'Crispy fried onions to top your biryani or pulao',
    price: 30,
    image: '/images/products/fried_onion.png',

  },
  {
    _id: 'TZh06If8UWMtw7RfxYfUiM',
    title: 'Extra Chicken Tikka Piece',
    description: 'Additional marinated and grilled chicken tikka piece',
    price: 50, // Estimated price
    image: '/images/products/chicken_tikka.png',

  },
  {
    _id: '2axI5gVoS4Ac0D04GqDp6R',
    title: 'Extra Beef Boti',
    description: 'Additional tender beef boti pieces',
    price: 60, // Estimated price
    image: '/images/products/beef_boti.png',

  },
  
  // SIDES CATEGORY
  {
    _id: 'TZh06If8UWMtw7RfxYfVIw',
    title: 'Raita',
    description: 'Yogurt-based side dish with mild spices',
    price: 40,
    image: '/images/products/raita.png',

  },
  {
    _id: 'TZh06If8UWMtw7RfxYfW5i',
    title: 'Salad',
    description: 'Fresh vegetable salad',
    price: 50,
    image: '/images/products/salad.png',
  },
  
  // DRINKS CATEGORY
  {
    _id: 'fW6dnvgAv0MK9oY0nud5eH',
    title: 'Cold Drink',
    description: 'Refreshing soft drink',
    price: 40, // Estimated price
    image: '/images/products/cold_drink.png',
  },
  {
    _id: 'crAVAYEOUy2k7pk2sRgNAX',
    title: 'Mineral Water',
    description: 'Bottled mineral water',
    price: 30, // Estimated price
    image: '/images/products/mineral_water.png',
  }
];

const PopularItems = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)
  const { dispatch } = useCart()
  const { showToast } = useToast();


  const checkScrollButtons = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setShowLeftButton(container.scrollLeft > 0)
    setShowRightButton(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    )
  }

  useEffect(() => {
    checkScrollButtons()
    window.addEventListener('resize', checkScrollButtons)
    return () => window.removeEventListener('resize', checkScrollButtons)
  }, [])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const cardWidth = 140 // Width of each card + gap
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    })

    // Update buttons after scroll
    setTimeout(checkScrollButtons, 300)
  }


  const handleAddToCart = (item: { _id: string; title: string; price: number; image: string; }) => {
    try {
      dispatch({
        type: "ADD_TO_CART",
        product: {
          _id: item._id,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: 1, // Default quantity is 1
        },
      });
      showToast("Added to cart successfully!", "success");
    } catch (error) {
      showToast("Failed to add to cart. Please try again.", "error");
      console.error(error);
    }
  };

  return (
    <div className="relative">
      {showLeftButton && (
        <button
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background shadow-lg p-2 transition-all hover:bg-primary hover:text-white"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      {showRightButton && (
        <button
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background shadow-lg p-2 transition-all hover:bg-primary hover:text-white"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        onScroll={checkScrollButtons}
      >
        {popularItems.map((item: Products) => (
          <div
            key={item._id}
            onClick={() => handleAddToCart(item)}
            className="group flex-none w-[120px] cursor-pointer rounded-xl border bg-card/50 p-2 transition-all hover:bg-primary/10 hover:shadow-md"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
              <Image 
                src={item.image || "/placeholder.svg"} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            <div className="mt-2 text-center">
              <h4 className="text-sm font-medium truncate">{item.title}</h4>
              <p className="text-sm text-muted-foreground">Rs. {item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularItems;