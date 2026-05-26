"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { CaseStudy, ServiceId } from "@/data/case-studies";
import { getServiceById } from "@/data/services";
import CaseStudyCard from "@/components/work/CaseStudyCard";
import WorkFilterDropdown from "@/components/work/WorkFilterDropdown";

interface WorkGridProps {
  caseStudies: CaseStudy[];
}

const PREVIEW_LIMIT = 12;
const ENTER_DURATION = 0.55; // seconds
const EXIT_DURATION = 0.4;
const STAGGER = 0.06;

/**
 * Three-phase state machine. `closing` keeps the extras mounted just long
 * enough for the exit animation to finish before they unmount.
 *  - collapsed  → only the first 12 cards rendered
 *  - expanded   → all cards rendered; GSAP enter animation runs on mount
 *  - closing    → all cards still rendered; GSAP exit animation runs, then
 *                 a setTimeout flips phase to `collapsed`
 */
type Phase = "collapsed" | "expanded" | "closing";

export default function WorkGrid({ caseStudies }: WorkGridProps) {
  const [activeService, setActiveService] = useState<ServiceId | null>(null);
  const [phase, setPhase] = useState<Phase>("collapsed");
  const phaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const allCards = [...caseStudies].sort((a, b) => a.order - b.order);
  const service = activeService ? getServiceById(activeService) : null;
  const filteredCards = activeService
    ? allCards.filter((cs) => cs.services.includes(activeService))
    : allCards;
  const showingExtras = phase !== "collapsed";
  const visibleCards = showingExtras
    ? filteredCards
    : filteredCards.slice(0, PREVIEW_LIMIT);
  const canToggle = filteredCards.length > PREVIEW_LIMIT;
  const expanded = phase === "expanded";
  const extraCount = Math.max(0, filteredCards.length - PREVIEW_LIMIT);

  // Drive the enter / exit animations off the `phase` value. GSAP is reliable
  // across React's reconciliation: when phase flips to "expanded" the extras
  // are freshly mounted (they read the CSS `.work-card-anim` starting state of
  // opacity:0 / translateY(24)), and gsap.to() animates them to the open state.
  // On "closing" we reverse it before the unmount fires.
  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;
      const extras = grid.querySelectorAll<HTMLElement>(".work-card-anim");
      if (extras.length === 0) return;

      if (phase === "expanded") {
        gsap.to(extras, {
          opacity: 1,
          y: 0,
          duration: ENTER_DURATION,
          ease: "power2.out",
          stagger: STAGGER,
          overwrite: true,
        });
      } else if (phase === "closing") {
        gsap.to(extras, {
          opacity: 0,
          y: 24,
          duration: EXIT_DURATION,
          ease: "power2.in",
          // Reverse stagger so the last card leaves first.
          stagger: { each: STAGGER, from: "end" },
          overwrite: true,
        });
      }
    },
    { dependencies: [phase, extraCount], scope: gridRef }
  );

  function toggle() {
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    if (phase === "collapsed" || phase === "closing") {
      setPhase("expanded");
    } else {
      setPhase("closing");
      const totalExitMs =
        EXIT_DURATION * 1000 + Math.max(0, extraCount - 1) * STAGGER * 1000 + 40;
      phaseTimer.current = setTimeout(() => setPhase("collapsed"), totalExitMs);
    }
  }

  useEffect(() => {
    return () => {
      if (phaseTimer.current) clearTimeout(phaseTimer.current);
    };
  }, []);

  function handleFilterChange(id: ServiceId | null) {
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
    setPhase("collapsed");
    setActiveService(id);
  }

  return (
    <section
      id="work"
      className="bg-[#e6e6e6] w-full px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px] py-[60px] sm:py-[80px] md:py-[80px] lg:py-[80px]"
    >
      <div className="max-w-[1380px] mx-auto flex flex-col items-center gap-[40px] sm:gap-[56px] md:gap-[72px] lg:gap-[86px]">
        <div className="flex flex-col items-center gap-[10px] w-full max-w-[623px] text-center">
          <h2 className="font-quintessential text-dark text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.4] tracking-[-1.4px] m-0">
            How We work with SoCal Builders
          </h2>
          <WorkFilterDropdown
            current={activeService ?? undefined}
            onChange={handleFilterChange}
          />
        </div>

        {service && (
          <div className="w-full border-t border-dark pt-[30px] sm:pt-[40px] md:pt-[50px] flex flex-col gap-[16px] sm:gap-[20px] md:gap-[24px] transition-opacity duration-500">
            <h3 className="font-bangers text-dark text-[48px] leading-[50px] tracking-[1.44px] uppercase m-0">
              {service.name}
            </h3>
            <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] max-w-[742px] m-0">
              {service.longDescription}
            </p>
          </div>
        )}

        <div
          ref={gridRef}
          className="work-grid-hover grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] sm:gap-[36px] md:gap-[48px] lg:gap-[57px] w-full"
        >
          {visibleCards.map((cs, i) => {
            const isExtra = i >= PREVIEW_LIMIT;
            if (!isExtra) {
              return (
                <CaseStudyCard key={cs.slug} caseStudy={cs} priority={i < 3} />
              );
            }
            return (
              <div key={cs.slug} className="work-card-anim">
                <CaseStudyCard caseStudy={cs} priority={false} />
              </div>
            );
          })}
        </div>

        {canToggle && (
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center justify-center w-[172px] h-[48px] bg-[#1e1e1e] text-white font-bangers text-[18px] leading-normal hover:opacity-90 transition-opacity cursor-pointer"
          >
            {expanded ? "view less" : "view all"}
          </button>
        )}
      </div>
    </section>
  );
}
