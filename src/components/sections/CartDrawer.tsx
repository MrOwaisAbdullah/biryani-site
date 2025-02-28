"use client";
import { Drawer, DrawerClose, DrawerTitle } from "@/components/ui/drawer";
import { DrawerContent } from "@/components/ui/drawer";
import { CircleX, ShoppingCart } from "lucide-react";
import CartContent from "./CartContent";
import { useCart } from "@/context/CartContext";
import { useEffect, useMemo, useState } from "react";
import { ScrollArea } from "../ui/scrollArea";

const CartDrawer = () => {
  const { state } = useCart(); // Access the cart state from context
  const { cart } = state;

  // Memoize cart count calculation
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + (item.quantity || 0), 0),
    [cart]
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
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

    // State to track if the device is mobile
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      setIsMounted(true);
      
      // Function to check if device is mobile based on window width
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 480);
      };
      
      // Set initial state
      checkIfMobile();
      
      // Add event listener for window resize
      window.addEventListener('resize', checkIfMobile);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', checkIfMobile);
      };
    }, []);
    
  return (
    <>
      {isMounted ? (
        <Drawer direction={isMobile ? "bottom" : "right"} open={isOpen} onOpenChange={setIsOpen}>
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
          <DrawerContent className="text-left overflow-hidden sm:max-w-[80%] md:max-w-[45%] lg:max-w-[35%]">
            {/* Close Button */}
            <DrawerClose
              className="text-accent absolute top-6 sm:top-1 right-3 m-5 text-xl"
              onClick={closeDrawer}
            >
              <CircleX />
            </DrawerClose>
            <DrawerTitle className="text-xl px-4 my-5">Your Cart</DrawerTitle>

            {/* Content Here*/}
              <CartContent />
          </DrawerContent>
        </Drawer>
      ) : (
        <button className="flex gap-2 items-center justify-center bg-primary hover:bg-secondary hover:text-primary text-sm font-medium text-background p-2 rounded-lg">
          <ShoppingCart size={17} />
          {cartCount > 0 && (
            <div className="rounded-full text-xs min-w-5 min-h-5 flex justify-center items-center text-center text-white bg-accent">
              {cartCount}
            </div>
          )}
        </button>
      )}

      {cartCount > 0 && (
        <div onClick={toggleDrawer} className="z-50 fixed bottom-0 left-1/2 transform -translate-x-1/2 rounded-t-3xl px-5 md:px-10 w-[90%] min-w-[30%] sm:max-w-[40%] h-12 flex justify-between items-center text-center text-white bg-primary">
          <p className="text-xs md:text-sm flex justify-center items-center min-h-5 min-w-5 md:min-w-7 md:min-h-7 border-2 border-white rounded-full ">{cartCount}</p>
          <p className="text-md md:text-lg font-medium cursor-pointer">View Cart</p>
          <p className="md:text-md font-medium">Rs. {subtotal}/-</p>
        </div>
      )}
    </>
  );
};

export default CartDrawer;
