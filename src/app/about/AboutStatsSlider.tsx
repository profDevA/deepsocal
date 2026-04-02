"use client";

import { useState, useEffect } from "react";

const stats = [
  { stat: "$8M+", label: "Revenue Generated" },
  { stat: "200+", label: "Community Partnerships" },
  { stat: "25+", label: "Industries Impacted" },
];

export default function AboutStatsSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % stats.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="about-hero-stats">
      <div className="item">
        <h2>{stats[active].stat}</h2>
        <p>{stats[active].label}</p>
      </div>
      <div className="flex justify-center gap-[10px] mt-2">
        {stats.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-[10px] h-[10px] rounded-full border border-[#111] p-0 cursor-pointer transition-colors ${
              i === active ? "bg-[#111]" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
