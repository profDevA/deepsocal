import Image from "next/image";

export default function CaliforniaMap({ className }: { className?: string }) {
  return (
    <Image
      src="/images/socal-map-light.png"
      alt="Map of California highlighting Southern California"
      fill
      sizes="614px"
      className={className}
      priority
    />
  );
}
