"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductCardProps {
  item: {
    title: string;
    price: number;
    image: string;
    badge?: string;
  };
}

export default function ProductCard({ item }: ProductCardProps) {
  const [isLoading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-950">
      {/* Image container with skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <Image
          src={imageError ? "/placeholder.svg" : item.image}
          alt={item.title}
          width={400}
          height={300}
          onError={() => setImageError(true)}
          onLoad={() => setLoading(false)}
          className={`h-full w-full object-cover transition-all duration-300 
                ${isLoading ? "scale-110 blur-sm" : "scale-100 blur-0"}
                ${!isLoading && "group-hover:scale-105"}`}
        />
        {isLoading && (
          <div className="absolute inset-0">
            <div className="animate-pulse w-full h-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 background-animate" />
          </div>
        )}
      </div>

      {/* Popular badge with skeleton */}
      {item.badge && (
        <div className="absolute right-4 top-4 z-10">
          {isLoading ? (
            <div className="h-6 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          ) : (
            <div className="px-2 bg-black text-primary transition-colors hover:text-black hover:bg-primary">
              Popular
            </div>
          )}
        </div>
      )}

      {/* Title with skeleton */}
      <div className="absolute left-0 top-0 z-0 p-4">
        {isLoading ? (
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        ) : (
          <h3 className="text-lg font-semibold leading-none tracking-tight text-white drop-shadow-md">
            {item.title}
          </h3>
        )}
      </div>

      {/* Price with skeleton */}
      <div className="absolute bottom-0 right-0 z-0 p-4">
        {isLoading ? (
          <div className="h-8 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
        ) : (
          <span className="text-xl font-semibold rounded-full bg-primary px-2 text-white drop-shadow-md">
            Rs. {item.price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}
