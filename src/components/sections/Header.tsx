"use client";

import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useMemo } from "react";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { state } = useCart(); 
  const { cart } = state;

  return (
    <header
      style={{ zIndex: 1 }}
      className="relative flex bg-background bg-gradient-to-t from-gray-100 to-background border-b-2 border-border xxs:px-5 md:px-12 justify-between items-center p-2 xxs:p-4 z-999"
    >
      <div className="flex gap-2 items-center">
        <Link className="hidden md:flex" href={"tel:+923371298510"}>
          <div className="flex gap-2 items-center bg-primary hover:bg-secondary hover:text-primary text-sm font-medium text-background p-1 px-2 rounded-lg">
            <MapPin size={15} />
            <div className="flex text-xs font-medium flex-col text-left">
              Location
              <p className="-mt-1 text-[10px]">Manzoor Colony, Karachi</p>
            </div>
          </div>
        </Link>

        <Link className="hidden md:flex" href={"tel:+923371298510"}>
          <button className="flex gap-2 items-center justify-center bg-primary hover:bg-secondary hover:text-primary text-sm font-medium text-background p-2 rounded-lg">
            <Phone size={15} fill="#ffffff" />
            +923371298510
          </button>
        </Link>
      </div>

      <Link href={"/"}>
        <Image
          className="absolute top-2 xxs:top-1 md:top-2 left-8 xxs:left-10 md:left-1/2 transform -translate-x-1/2 w-10 xxs:w-14 md:w-20 lg:w-24 rounded-full z-999"
          src={logo}
          alt="Biryani Center"
        />
      </Link>
      <div className="flex gap-2 items-center justify-center">
        <Link className="hidden md:hidden xxs:flex" href={"tel:+923371298510"}>
          <button className="flex gap-2 items-center justify-center bg-primary hover:bg-secondary hover:text-primary text-[10px] xxs:text-sm font-medium text-background p-2 rounded-lg">
            <Phone size={15} fill="#ffffff" />
            +923371298510
          </button>
        </Link>

        <CartDrawer />
      </div>


    </header>
  );
};

export default Header;
