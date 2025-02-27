"use client"

import { useCart } from "@/context/CartContext"
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from "next/image"
import PopularWithOrder from "./PopularOrder"

export default function CartContent() {
  const { state, dispatch } = useCart()
  const { cart } = state

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const handleQuantityChange = (
    id: string,
    quantity: number
  ) => {
    if (quantity < 1) return; // Don't allow quantities less than 1
    dispatch({ type: "UPDATE_QUANTITY", id, quantity: quantity });
  };

  const subtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
  const deliveryFee = 300
  const total = subtotal + deliveryFee

  const handleWhatsAppOrder = () => {
    const message = `🛒 New Order:\n\n${cart
      .map((item) => `${item.quantity}x ${item.title} - Rs. ${item.price * (item.quantity || 1)}`)
      .join("\n")}\n\n📝 Order Summary:\nSubtotal: Rs. ${subtotal.toFixed(2)}\nDelivery: Rs. ${deliveryFee}\nTotal: Rs. ${total}`

    window.open(`https://wa.me/+923371298510?text=${encodeURIComponent(message)}`, "_blank")
  }

  if (cart.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="rounded-full bg-primary/10 p-6">
          <svg className="h-12 w-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">Your cart is empty</h3>
          <p className="text-sm text-muted-foreground">Add items to your cart to continue shopping</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] max-w-[450px] m-auto flex-col ">
        <div className="px-4">
          {/* Cart Items Section */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div 
                  key={item._id} 
                  className="flex items-center gap-4 rounded-xl border bg-card/50 p-3 backdrop-blur-sm transition-all hover:bg-primary/10"
                >
                  <div className="relative aspect-square h-20 overflow-hidden rounded-lg bg-muted">
                    <Image 
                      src={item.image || "/placeholder.svg"} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-300 hover:scale-110" 
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <h3 className="font-medium truncate">{item.title}</h3>
                        <p className="text-sm font-medium text-primary">Rs. {item.price.toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => handleRemove(item._id)} 
                        className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive shrink-0"
                      >
                        <Trash2 className="h-5 w-5 m-auto" />
                      </button>
                    </div>
                    {/* Quantity controls*/}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, (item.quantity || 1) - 1)}
                        className="h-7 w-7 rounded-md border hover:bg-accent hover:text-white flex items-center justify-center"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center font-medium text-sm">{item.quantity || 1}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, (item.quantity || 1) + 1)}
                        className="h-7 w-7 rounded-md border hover:bg-accent hover:text-white flex items-center justify-center"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          {/* <div className="h-px  w-full flex justify-center items-center bg-black/30 my-5"></div> */}

          {/* Popular Items Section */}
          <div className="border-t bg-background/80 backdrop-blur-sm mt-8">
            <h3 className="font-semibold text-md sticky top-0 bg-background pt-2">Popular with your order</h3>
            <p className="pb-2 text-xs">Customers often buy these together</p>
            <div className="relative">
              <PopularWithOrder />
            </div>
          </div>
        </div>

      {/* Order Summary */}
      <div className="border-t bg-background/80 backdrop-blur-sm p-4 space-y-4 mt-auto">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className="font-medium">Rs. {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid gap-2">
          <button
            onClick={handleWhatsAppOrder}
            className="relative flex items-center justify-center gap-5 w-full overflow-hidden rounded-xl bg-[#25D366] p-3 font-medium text-white transition-all after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/0 after:to-white/10 hover:shadow-lg hover:shadow-[#25D366]/20 active:scale-[0.98]"
          >
            <Image className="absolute left-16 p-1" src={"/whatsapp.png"} alt="Order on WhatsApp" width={50} height={50}/>
            Order on WhatsApp
          </button>
          <button
            onClick={() => window.open("https://www.foodpanda.pk", "_blank")}
            className="relative flex items-center justify-center gap-5 w-full overflow-hidden rounded-xl bg-[#D60265] p-3 font-medium text-white transition-all after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/0 after:to-white/10 hover:shadow-lg hover:shadow-[#D6156E]/20 active:scale-[0.98]"
          >
            Order through Foodpanda
            <Image className="absolute right-6 w-20 object-cover rotate-12" src={"/foodpanda.png"} alt="Order through FoodPanda" width={50} height={50}/>
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          We Only Deliver in Limited Areas<br/>Please Order through Foodpanda for Delivery in Your Area
        </p>
      </div>
    </div>
  )
}