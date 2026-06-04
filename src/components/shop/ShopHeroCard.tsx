'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { type Product } from '@/data/products'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const CARD_HEIGHT = 453
const CARD_GAP = 37
const STEP_SCROLL = 500
// Pin start point must equal the sticky Header's min-h so the card top
// lands flush against the header bottom instead of pinning behind it.
const HEADER_OFFSET = 64
// Must stay in sync with the `pt-[120px]` Tailwind class on the track div.
const TOP_GAP = 120
const BOTTOM_GAP = 120

interface ShopHeroCardProps {
  products: Product[]
  heroImage: string
}

export default function ShopHeroCard({
  products,
  heroImage,
}: ShopHeroCardProps) {
  const root = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (reduce) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const trackEl = trackRef.current
        const sectionEl = root.current
        if (!trackEl || !sectionEl) return

        const cardCount = products.length
        if (cardCount < 2) return

        const trackContentBottom =
          TOP_GAP + cardCount * CARD_HEIGHT + (cardCount - 1) * CARD_GAP

        // Passed as a function so `invalidateOnRefresh` re-evaluates against
        // the live section height on resize. End-state math: last card's
        // bottom = sectionHeight - BOTTOM_GAP.
        const computeTranslate = () => {
          const sectionHeight = sectionEl.getBoundingClientRect().height
          return Math.max(0, trackContentBottom - sectionHeight + BOTTOM_GAP)
        }

        const snapSteps = cardCount - 1

        const tween = gsap.to(trackEl, {
          y: () => -computeTranslate(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionEl,
            start: `top ${HEADER_OFFSET}px`,
            end: () => `+=${snapSteps * STEP_SCROLL}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: 1,
            snap: {
              snapTo: 1 / snapSteps,
              duration: { min: 0.25, max: 0.5 },
              ease: 'power2.inOut',
              delay: 0.15,
              directional: true,
              inertia: false,
            },
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })
    },
    { scope: root, dependencies: [products.length] },
  )

  return (
    <>
      {/* Desktop — pinned hero card with vertically-scrolling product track */}
      <div
        ref={root}
        className="hidden lg:block max-w-[1384px] mx-auto h-[calc(100vh-64px)] border border-[#c4c4c4] overflow-hidden relative isolate"
      >
        <div className="absolute inset-0 -z-10 bg-[#1f1f1f]">
          <Image
            src={heroImage}
            alt="DeepSoCal merch lifestyle"
            fill
            priority
            sizes="(max-width: 1384px) 100vw, 1384px"
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.1)]" />
        </div>

        {/* The track's `pt-[120px]` is real layout space — at rest the hero
            shows through it, and GSAP scrolls the padding past the top edge
            (clipped by `overflow-hidden`) so cards take its place. */}
        <div className="absolute top-0 bottom-0 right-[91px] w-[399px] overflow-hidden z-10">
          <div
            ref={trackRef}
            className="flex flex-col gap-[37px] pt-[120px] will-change-transform"
          >
            {products.map(product => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile — full-bleed lifestyle hero with a horizontal swipe carousel
          + pagination dots (Figma 821:4146). */}
      <MobileShopCarousel products={products} heroImage={heroImage} />
    </>
  )
}

function MobileShopCarousel({
  products,
  heroImage,
}: {
  products: Product[]
  heroImage: string
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    const onInit = () => setSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    // Defer the initial sync to the next frame so we don't call setState
    // synchronously inside the effect body (avoids React's cascading-render warning).
    const raf = requestAnimationFrame(() => {
      onInit()
      onSelect()
    })
    return () => {
      cancelAnimationFrame(raf)
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onInit)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  return (
    <div className="lg:hidden relative w-full h-[600px] bg-black overflow-hidden">
      <Image
        src={heroImage}
        alt="DeepSoCal merch lifestyle"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Carousel band — vertically centered over the lifestyle photo */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex pl-[16px]">
            {products.map(product => (
              <div
                key={product.slug}
                className="shrink-0 grow-0 basis-[280px] pr-[16px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-[24px] inset-x-0 flex items-center justify-center gap-[15px]">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`size-[9.184px] rounded-full border-[0.765px] border-white cursor-pointer p-0 transition-colors ${
              i === selected ? 'bg-white' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0]

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative block w-full h-[312px] lg:h-[453px] bg-[#dadada] border border-[#b0b0b0] overflow-hidden no-underline shrink-0"
    >
      {cover ? (
        <Image
          src={cover}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 280px, 427px"
          className="object-cover object-top"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: product.themeColor }}
        >
          <span className="font-acumin-condensed text-dark/30 text-[28px] lg:text-[40px] tracking-[1.5px] uppercase select-none">
            {product.name}
          </span>
        </div>
      )}

      <span
        className="absolute top-[14px] right-[14px] lg:top-[20px] lg:right-[20px] inline-flex items-center justify-center h-[17px] lg:h-[24px] px-[7px] lg:px-[10px] font-acumin-condensed text-white text-[10px] lg:text-[14px] leading-[1.4] uppercase whitespace-pre z-10"
        style={{ backgroundColor: 'rgba(51,51,51,0.8)' }}
      >
        {`$ ${product.price.toFixed(2)}  ${product.shipping}`}
      </span>

      <div className="absolute inset-x-0 bottom-0 h-[141px] lg:h-[204px] bg-white overflow-hidden z-5">
        <div className="absolute top-[30px] left-[23px] right-[23px] lg:top-[44px] lg:left-[34px] lg:right-[34px] flex items-end gap-[24px] lg:gap-[55px]">
          <div className="flex flex-col gap-[14px] lg:gap-[20px] flex-1 min-w-0">
            <h3 className="font-acumin-condensed text-[#1e1e1e] text-[22px] leading-[25px] lg:text-[32px] lg:leading-[37px] uppercase m-0">
              {product.name}
            </h3>
            <p className="font-acumin font-normal text-[#1e1e1e] text-[11px] leading-[14px] tracking-[0.33px] lg:text-[16px] lg:leading-[20px] lg:tracking-[0.48px] m-0 line-clamp-3">
              {product.description}
            </p>
          </div>
          <Image
            src="/images/icons/arrow-right-down.svg"
            alt=""
            width={35}
            height={31}
            className="w-[24px] h-[21px] lg:w-[35px] lg:h-[31px] shrink-0 transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  )
}
