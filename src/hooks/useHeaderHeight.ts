"use client";

import { useEffect, useRef, useState } from "react";

export function useHeaderHeight() {
  const headerRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      if (headerRef.current) {
        setHeight(headerRef.current.offsetHeight);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { headerRef, height };
}
