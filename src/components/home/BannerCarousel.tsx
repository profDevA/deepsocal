'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

const slides = [
  {
    type: 'svg',
    headerLeft: 'SOLVING CHALLENGES',
    headerRight: 'driving innovation',
    image: '/images/DeepSoCal-banner.svg',
    alt: 'deepSoCal',
    caption: null,
    overlayType: null,
  },
  {
    type: 'image',
    headerLeft: 'SOLVING CHALLENGES,',
    headerRight: 'driving innovation',
    image: '/images/slide-2-ochealth.jpg',
    alt: 'OC Health Care Agency',
    caption:
      'Connected 200 families to affordable housing opportunities through branding and research in partnership with Pacific Horizon, to reduce homelessness in Encinitas.',
    overlayType: 'logo',
    overlayLogo: '/images/ochealth-logo.png',
  },
  {
    type: 'image',
    headerLeft: 'SOLVING CHALLENGES',
    headerRight: 'driving innovation',
    image: '/images/slide-3-ocnavigator.jpg',
    alt: 'OC Navigator',
    caption:
      'Designed a digital resource platform connecting Orange County residents to essential community services and support networks.',
    overlayType: 'text',
    overlayText: 'OC\nNavigator',
  },
  {
    type: 'image',
    headerLeft: 'SOLVING CHALLENGES',
    headerRight: 'driving innovation',
    image: '/images/slide-4-surf.jpg',
    alt: 'Surf Culture',
    caption:
      "Developed brand strategy and content for Southern California's premier surf culture publication, reaching over 50,000 readers.",
    overlayType: null,
  },
  {
    type: 'image',
    headerLeft: 'SOLVING CHALLENGES',
    headerRight: 'driving innovation',
    image: '/images/slide-5-yellow.jpg',
    alt: 'SoCal Lifestyle',
    caption:
      "Crafted authentic lifestyle campaigns celebrating Southern California's diverse communities and creative culture.",
    overlayType: null,
  },
]

const DESC =
  "DeepSocal is a regional strategic design agency building transformative experiences for SoCal's brands by blending deep research, AI & technology, strategy, design, and technology."

export default function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  return (
    <section id="banner" className="px-[1.1vw]! max-[1025px]:px-[15px]!">
      <div className="w-full">
        <div className="w-full px-0">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                  {slides.map((slide, i) => (
                    <div key={i} className="flex-[0_0_100%] min-w-0">
                      <div>
                        <div className="flex flex-col gap-3 items-center">
                          <div className="flex justify-between w-[82%] max-w-[1400px] mx-auto">
                            <span className="font-semibold text-[clamp(10px,0.9vw,14px)] whitespace-nowrap tracking-[0.5px]">{slide.headerLeft}</span>
                            <span className="font-semibold text-[clamp(10px,0.9vw,14px)] whitespace-nowrap tracking-[0.5px]">{slide.headerRight}</span>
                          </div>
                          <div
                            className={
                              slide.type === 'svg'
                                ? 'w-[82%] max-w-[1400px] mx-auto overflow-hidden relative bg-black p-[40px_30px]'
                                : 'w-[82%] max-w-[1400px] mx-auto overflow-hidden relative'
                            }
                            style={{ height: slide.type === 'svg' ? 'calc(35vw + 3.5vw)' : '35vw' }}
                          >
                            <Image
                              src={slide.image}
                              className={
                                slide.type === 'svg'
                                  ? 'object-contain object-center'
                                  : 'object-cover object-[center_25%]'
                              }
                              alt={slide.alt}
                              fill
                              sizes="82vw"
                              unoptimized={slide.type === 'svg'}
                            />
                            {slide.overlayType === 'logo' && (
                              <div className="absolute top-[12%] right-[5%]">
                                <Image
                                  src={slide.overlayLogo!}
                                  alt={slide.alt}
                                  width={220}
                                  height={80}
                                  style={{ width: 'clamp(120px, 15vw, 220px)', height: 'auto' }}
                                />
                              </div>
                            )}
                            {slide.overlayType === 'text' && (
                              <div
                                className="absolute top-[15%] left-[5%] text-white whitespace-pre-line"
                                style={{
                                  fontFamily: "'Instrument Serif', serif",
                                  fontStyle: 'italic',
                                  fontSize: 'clamp(32px, 5vw, 72px)',
                                  lineHeight: 1,
                                  textShadow: '1px 2px 8px rgba(0,0,0,0.3)',
                                }}
                              >
                                {slide.overlayText}
                              </div>
                            )}
                            {slide.type === 'image' && (
                              <div className="absolute bottom-3 right-3 z-1">
                                <Image src="/images/banner-watermark.svg" alt="deepSoCal" className="block" width={130} height={40} unoptimized style={{ width: "clamp(90px,9vw,130px)", height: "auto" }} />
                              </div>
                            )}
                          </div>
                          {slide.caption && (
                            <p className="w-[82%] max-w-[1400px] mx-auto font-quintessential text-[clamp(14px,1.25vw,18px)] text-center tracking-[-1.44px] leading-[1.45] text-black p-0">{slide.caption}</p>
                          )}
                          <div className="flex items-center gap-5 w-full pt-2.5">
                            <div className="flex-1 h-px bg-black"></div>
                            <p className="shrink-0 max-w-[45%] text-[clamp(14px,1vw,20px)] text-center leading-[1.15] m-0 font-bold">{DESC}</p>
                            <div className="flex-1 h-px bg-black"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-1.5 py-4">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer p-0 transition-colors duration-300 ${i === selectedIndex ? 'bg-black' : 'bg-[#c8c8c8]'}`}
                    onClick={() => emblaApi?.scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
