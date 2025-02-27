"use client";
import { Drawer, DrawerClose, DrawerTitle } from "@/components/ui/drawer"
import { DrawerContent } from "@/components/ui/drawer"
import { CircleX, ShoppingCart } from "lucide-react"
import CartContent from "./CartContent"
import { useCart } from "@/context/CartContext"
import { useEffect, useMemo, useState } from "react"
import { ScrollArea } from "../ui/scrollArea";

const CartDrawer = () => {
      const { state } = useCart(); // Access the cart state from context
      const { cart } = state;
    
      // Memoize cart count calculation
      const cartCount = useMemo(
        () => cart.reduce((total, item) => total + (item.quantity || 0), 0),
        [cart]
      );
    
      // State to manage the open/close status of the drawer
      const [isOpen, setIsOpen] = useState(false);
      const [isMounted, setIsMounted] = useState(false);
    
      useEffect(() => {
        setIsMounted(true);
      }, []);
      
      // Function to toggle the drawer's open/close state
      const toggleDrawer = () => setIsOpen((prev) => !prev);
      // Function to explicitly close the drawer
      const closeDrawer = () => setIsOpen(false);
  return (
    <>
    {isMounted ? (
        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
          {/* Button to Toggle Drawer */}
          <button
            onClick={toggleDrawer}
            className="flex gap-2 items-center justify-center bg-primary hover:bg-secondary hover:text-primary text-sm font-medium text-background p-2 rounded-lg"
          >
            <ShoppingCart size={17} />
            {cartCount > 0 && (
              <div className="rounded-full text-xs min-w-5 min-h-5 flex justify-center items-center text-center text-white bg-accent">
                {cartCount}
              </div>
            )}
          </button>
          <DrawerContent className="bg-background mx-auto text-left px-4 overflow-x-hidden xs:max-w-[80%] md:max-w-[45%] lg:max-w-[35%] ">
            {/* Close Button */}
            <DrawerClose
              className="text-accent absolute top-1 right-3 m-5 text-xl"
              onClick={closeDrawer}
            >
              <CircleX />
            </DrawerClose>
            <DrawerTitle className="text-xl my-5">Your Cart</DrawerTitle>

            {/* Content Here*/}
            <CartContent />

          </DrawerContent>
        </Drawer>
      ) : (
        <button
          className="flex gap-2 items-center justify-center bg-primary hover:bg-secondary hover:text-primary text-sm font-medium text-background p-2 rounded-lg"
        >
          <ShoppingCart size={17} />
          {cartCount > 0 && (
            <div className="rounded-full text-xs min-w-5 min-h-5 flex justify-center items-center text-center text-white bg-accent">
              {cartCount}
            </div>
          )}
        </button>
      )}
    </>
  )}

export default CartDrawer;