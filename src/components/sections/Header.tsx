"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { CircleX, MapPin, Phone, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "../ui/drawer";

const Header = () => {
  const { state } = useCart(); // Access the cart state from context
  const { cart } = state;

  // Memoize cart count calculation
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + (item.quantity || 0), 0),
    [cart]
  );

    // State to manage the open/close status of the drawer
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the drawer's open/close state
    const toggleDrawer = () => setIsOpen((prev) => !prev);
    // Function to explicitly close the drawer
    const closeDrawer = () => setIsOpen(false);

  return (
    <header
      style={{ zIndex: 1 }}
      className="relative flex bg-background bg-gradient-to-t from-gray-100 to-background border-b-2 border-border px-5 md:px-12 justify-between items-center p-4 z-999"
    >
      <div className="flex gap-2 items-center">
      <Link className="hidden md:flex" href={"tel:+923371298510"}>
        <button className="flex gap-2 items-center bg-primary hover:bg-secondary hover:text-primary text-sm font-medium text-background p-1 px-2 rounded-lg">
        <MapPin size={15}/>
        <div className="flex text-xs font-medium flex-col text-left">
        Location
        <p className="-mt-1 text-[10px]">Manzoor Colony, Karachi</p>
        </div>
        </button>
      </Link>

      <Link className="hidden md:flex" href={"tel:+923371298510"}>
        <button className="flex gap-2 items-center justify-center bg-primary hover:bg-secondary hover:text-primary text-sm font-medium text-background p-2 rounded-lg">
        <Phone size={15} fill="#ffffff"/>
        +923371298510
        </button>
      </Link>
      </div>

      <Link href={"/"}>
        <Image
          className="absolute top-1 md:top-2 left-10 md:left-1/2 transform -translate-x-1/2 w-14 md:w-20 lg:w-24 rounded-full z-999"
          src={logo}
          alt="Biryani Center"
        />
      </Link>
      <div className="flex gap-2 items-center justify-center">
        <Link className="md:hidden flex" href={"tel:+923371298510"}>
          <button className="flex gap-2 items-center justify-center bg-primary hover:bg-secondary hover:text-primary text-sm font-medium text-background p-2 rounded-lg">
            <Phone size={15} fill="#ffffff"/>
            +923371298510
          </button>
        </Link>

        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
          {/* Button to Toggle Drawer */}
          <button onClick={toggleDrawer} className="flex gap-2 items-center justify-center bg-primary hover:bg-secondary hover:text-primary text-sm font-medium text-background p-2 rounded-lg">
            <ShoppingCart size={17} />
            {cartCount > 0 && (
              <div className="rounded-full text-xs min-w-5 min-h-5 flex justify-center items-center text-center text-white bg-accent">
                {cartCount}
              </div>
            )}
          </button>
          <DrawerContent className="bg-background mx-auto text-left px-6 xs:max-w-[80%] md:max-w-[45%] lg:max-w-[35%] ">
            {/* Close Button */}
            <DrawerClose className="text-accent absolute top-1 right-3 m-5 text-xl" onClick={closeDrawer}>
              <CircleX />
            </DrawerClose>
            <DrawerTitle className="text-xl my-5">
              Your Cart
            </DrawerTitle>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
