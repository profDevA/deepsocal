"use client";

import { useState, useEffect, useCallback } from "react";

const stats = [
  { stat: "$8M+", label: "Revenue Generated" },
  { stat: "200+", label: "Community Partnerships" },
  { stat: "25+", label: "Industries Impacted" },
];

export default function StatsSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % stats.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div>
      <div className="text-center">
        <h2 className="text-[6.8vw] font-druk leading-none mb-0">{stats[current].stat}</h2>
        <p className="uppercase text-[0.85rem] tracking-[0.3px]">{stats[current].label}</p>
      </div>
      <div className="flex justify-center gap-2.5 mt-2">
        {stats.map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full border border-dark cursor-pointer p-0 ${i === current ? "bg-dark" : "bg-transparent"}`}
            onClick={() => setCurrent(i)}
            aria-label={`Stat ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
