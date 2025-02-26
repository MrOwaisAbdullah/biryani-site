"use client";
import React, { useState } from "react";
import Image from "next/image";

interface HeadingsProps {
  image: string;
  alt: string;
}

const Headings = ({ image, alt }: HeadingsProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div
      className={`relative max-w-7xl m-auto px-2 md:px-5
                ${isImageLoading ? "blur-sm" : "blur-0"}`}
    >
      <Image
        onLoad={() => setIsImageLoading(false)}
        className="flex justify-center items-center rounded-lg w-full mt-20 mb-10"
        src={image}
        alt={alt}
        width={1000}
        height={500}
      />
      {isImageLoading && (
        <div className="absolute inset-0">
          <div className="animate-pulse w-full h-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 background-animate" />
        </div>
      )}
    </div>
  );
};

export default Headings;
