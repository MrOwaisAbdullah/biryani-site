"use client"

import { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Slide {
  image: string
  title: string
  description: string
}

const slides: Slide[] = [
    {
      image: "/image3.webp",
      title: "Hyderabadi Yakhni Pulao!",
      description: "Authentic Hyderabadi Yakhni Pulao, cooked with traditional spices and rich flavors, just like you love it!",
    },
    {
      image: "/image.jpg",
      title: "Tikka Biryani: Masalay Daar, Mazedar!",
      description: "Savor the perfect blend of tikka and biryani. Each bite is packed with smoky tikka flavor and aromatic rice.",
    },
    {
      image: "/image2.png",
      title: "Dawat-e-Biryani at AL Rehman!",
      description: "Your ultimate destination for the most flavorful Hyderabadi Pulao, and Chicken Tikka Biryani in town.\n Order now and enjoy!",
    },
  ]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  // Create an array that includes the last slide at the beginning and first slide at the end
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]]

  // Adjust the current slide index to account for the cloned slides
  const adjustedCurrentSlide = currentSlide + 1

  const handleTransitionEnd = () => {
    setIsAnimating(false)

    // If we're at the clone of the last slide, jump to the real last slide without transition
    if (currentSlide === slides.length) {
      setCurrentSlide(0)
    }
    // If we're at the clone of the first slide, jump to the real first slide without transition
    else if (currentSlide === -1) {
      setCurrentSlide(slides.length - 1)
    }
  }

  const changeSlide = useCallback(
    (newIndex: number) => {
      if (isAnimating) return
      setIsAnimating(true)
      setCurrentSlide(newIndex)
    },
    [isAnimating],
  )

  const nextSlide = useCallback(() => {
    changeSlide(currentSlide + 1)
  }, [currentSlide, changeSlide])

  const previousSlide = () => {
    changeSlide(currentSlide - 1)
  }

  const goToSlide = (index: number) => {
    changeSlide(index)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying && !isAnimating) {
      interval = setInterval(nextSlide, 5000)
    }

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, isAnimating])

  return (
    <div
      className="relative w-full bg-black"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div
        className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
        role="region"
        aria-label="Hero Image Slider"
      >
        <div
          className="absolute h-full w-full flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${adjustedCurrentSlide * 100}%)`,
            transition: isAnimating ? "transform 500ms ease-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, index) => (
            <div key={index} className="h-full w-full flex-shrink-0 flex-grow-0" style={{ flexBasis: "100%" }}>
              <div className="relative h-full w-full">
                <Image src={slide.image || "/placeholder.svg"} alt={slide.title} className="h-full w-full object-cover" width={1000} height={600} priority />
                <div className="absolute inset-0 bg-black/40">
                  <div className="container mx-auto flex h-full items-center justify-center px-4">
                    <div
                      className="text-center text-white"
                      style={{
                        opacity: index === adjustedCurrentSlide ? 1 : 0,
                        transform: `translateY(${index === adjustedCurrentSlide ? 0 : 20}px)`,
                        transition: "opacity 500ms ease-out, transform 500ms ease-out",
                      }}
                    >
                      <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">{slide.title}</h2>
                      <p className="text-lg max-w-5xl sm:text-xl md:text-2xl">{slide.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={previousSlide}
        disabled={isAnimating}
        className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ zIndex: 20 }}
      >
        <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ zIndex: 20 }}
      >
        <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-2" style={{ zIndex: 20 }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`h-2 w-2 rounded-full transition-all sm:h-3 sm:w-3 disabled:cursor-not-allowed ${
              index === currentSlide ? "bg-white w-4 sm:w-6" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

