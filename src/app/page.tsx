import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import MenuItems from "@/components/sections/MenuItems";
import PopularItems from "@/components/sections/PopularItems";
import Headings from "@/components/ui/headings";
import React from "react";

const Home = () => {

  return (
    <>
      <Header />
      <Hero />
      
      <main className="min-h-screen mx-auto bg-gradient-to-b from-gray-100 to-background py-16">
      <PopularItems />

      <Headings image="/2.png" alt="Banner Image 2" />
      <MenuItems categoryTitle="Pulao"/>

      <Headings image="/1.png" alt="Banner Image 1" />
      <MenuItems categoryTitle="Tikka Biryani"/>

      <Headings image="/3.png" alt="Banner Image 3" />
      <MenuItems categoryTitle="Cold Drinks"/>

      <Headings image="/4.png" alt="Banner Image 4" />
      <MenuItems categoryTitle="Extras"/>

      <Headings image="/6.png" alt="Banner Image 5" />
      <MenuItems categoryTitle="Sides"/>

      <Headings image="/7.png" alt="Banner Image 6"/>
      <MenuItems categoryTitle="Desserts"/>
      </main>
      <Footer />
    </>
  );
};

export default Home;
