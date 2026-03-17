import { useMemo, useEffect, useState } from "react"
import { useHeroBanners } from "@/hooks/useShopify"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import type { CarouselApi } from "@/components/ui/carousel"


export type SlideData = {
  id: string
  src: string
  alt?: string
}

const AUTO_DELAY = 4000


interface HeroCarouselProps {
  slides?: SlideData[]
}

const HeroCarousel = ({ slides: propSlides }: HeroCarouselProps) => {
  const { data: heroSlides = [] } = useHeroBanners()
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)

  // Normalize Shopify data if no slides prop
  const slides = useMemo<SlideData[]>(() => {
    if (propSlides && propSlides.length > 0) {
      return propSlides
    }
    return heroSlides
      .map((slide, index) => {
        if (!slide.image) return null
        return {
          id: slide.id ?? `hero-${index}`,
          src: slide.image,
          alt: slide.heading || slide.subheading || `Hero banner ${index + 1}`,
        }
      })
      .filter(Boolean) as SlideData[]
  }, [propSlides, heroSlides])

  // Track active slide for dots
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    onSelect()
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  if (slides.length === 0) return null

  return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-6">
      <div
        className="mx-auto w-full"
        style={{ maxWidth: "min(1400px, 92vw)" }}
      >
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: AUTO_DELAY,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="relative overflow-hidden rounded-2xl bg-background shadow-lg shadow-black/5"
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[420px] overflow-hidden rounded-2xl">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* DOTS */}
          {slides.length > 1 && (
            <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 w-6 rounded-full transition-all duration-300 ${
                    index === current
                      ? "bg-golden"
                      : "bg-foreground/30 hover:bg-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </Carousel>
      </div>
    </section>
  )
}

export default HeroCarousel
