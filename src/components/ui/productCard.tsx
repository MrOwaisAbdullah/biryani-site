import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProductCardProps {
  item : {
    title: string
    price: number
    image: string
    badge?: string
    className?: string
  }
}

export default function ProductCard( {item} : ProductCardProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-xl bg-white dark:bg-gray-950", item.className)}>
      {/* Popular badge */}
      {item.badge && (
        <Badge className="absolute right-4 top-4 z-10 bg-primary/90 hover:bg-primary" variant="secondary">
          Popular
        </Badge>
      )}

      {/* Name overlay at top */}
      <div className="absolute left-0 top-0 z-10 p-4">
        <h3 className="text-lg font-semibold leading-none tracking-tight text-white drop-shadow-md">{item.title}</h3>
      </div>

      {/* Price overlay at bottom */}
      <div className="absolute bottom-0 right-0 z-10 p-4">
        <span className="text-xl font-semibold text-white drop-shadow-md">${item.price.toFixed(2)}</span>
      </div>

      {/* Image container */}
      <div className="aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        </div>
    </div>
  )
}

