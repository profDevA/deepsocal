import Image from "next/image";

export default function BigWordmark() {
  return (
    <section data-bigwordmark className="bg-[#e6e6e6] w-full overflow-hidden relative flex items-center justify-center pt-[86px] pb-[40px] px-[25px]">
      <Image
        src="/images/deepsocal-wordmark-large.svg"
        alt="deepSoCal"
        width={1379}
        height={393}
        priority
        className="w-full max-w-[1280px] h-auto select-none pointer-events-none"
      />
    </section>
  );
}
