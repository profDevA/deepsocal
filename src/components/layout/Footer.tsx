import Link from "next/link";
import Image from "next/image";
import { FaBasketball, FaInstagram, FaThreads, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="px-[1.1vw] max-[1025px]:px-[15px]">
      <div className="border-l border-r border-black py-[4vw] pl-[2.5vw] pr-[2.5vw] max-[1025px]:py-[60px] max-[1025px]:pl-[35px] max-[1025px]:pr-[35px]">
        <div className="w-full">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div>
                <Image src="/images/logo-black.svg" className="w-full" alt="DeepSoCal" width={1400} height={100} unoptimized style={{ width: "100%", height: "auto" }} />
                <div className="flex flex-wrap justify-end">
                  <ul className="inline-flex gap-[1vw] list-none p-0">
                    <li><a href="#" className="w-[2.8vw] h-[2.8vw] inline-flex items-center justify-center bg-black text-white no-underline rounded-full text-[1.3vw] border border-black max-[1025px]:w-[50px] max-[1025px]:h-[50px] max-[1025px]:text-[120%]"><FaInstagram /></a></li>
                    <li><a href="#" className="w-[2.8vw] h-[2.8vw] inline-flex items-center justify-center bg-black text-white no-underline rounded-full text-[1.3vw] border border-black max-[1025px]:w-[50px] max-[1025px]:h-[50px] max-[1025px]:text-[120%]"><FaBasketball /></a></li>
                    <li><a href="#" className="w-[2.8vw] h-[2.8vw] inline-flex items-center justify-center bg-black text-white no-underline rounded-full text-[1.3vw] border border-black max-[1025px]:w-[50px] max-[1025px]:h-[50px] max-[1025px]:text-[120%]"><FaThreads /></a></li>
                    <li><a href="#" className="w-[2.8vw] h-[2.8vw] inline-flex items-center justify-center bg-black text-white no-underline rounded-full text-[1.3vw] border border-black max-[1025px]:w-[50px] max-[1025px]:h-[50px] max-[1025px]:text-[120%]"><FaXTwitter /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black pt-[2.5vw] pb-[2.5vw] -mx-[1.1vw] px-5 max-[1025px]:pt-[35px] max-[1025px]:pb-[35px] max-[600px]:p-[60px_15px]!">
        <div className="w-full">
          <div className="flex flex-wrap max-[600px]:gap-y-[60px]">
            <div className="w-full md:w-1/3">
              <div>
                <Image src="/images/your_ally.svg" alt="Your Embedded Ally" width={300} height={80} unoptimized style={{ width: "auto", height: "auto" }} />
              </div>
            </div>
            <div className="w-full md:flex-1">
              <div>
                <h3 className="text-[1.5vw] text-white uppercase mb-[1vw] max-[1025px]:text-[120%] max-[1025px]:mb-[15px]">Contact Us</h3>
                <ul className="m-0 p-0 list-none flex flex-col gap-[0.5vw]">
                  <li><a href="mailto:create@deepsocal.com" className="no-underline text-white">create@deepsocal.com</a></li>
                  <li><a href="mailto:careers@deepsocal.com" className="no-underline text-white">careers@deepsocal.com</a></li>
                </ul>
              </div>
            </div>
            <div className="w-full md:flex-1">
              <div>
                <h3 className="text-[1.5vw] text-white uppercase mb-[1vw] max-[1025px]:text-[120%] max-[1025px]:mb-[15px]">Visit Us</h3>
                <ul className="m-0 p-0 list-none flex flex-col gap-[0.5vw] text-white">
                  <li>Southern California</li>
                  <li>Orange County, CA</li>
                </ul>
              </div>
            </div>
            <div className="w-full md:flex-1">
              <div>
                <h3 className="text-[1.5vw] text-white uppercase mb-[1vw] max-[1025px]:text-[120%] max-[1025px]:mb-[15px]">Follow Us</h3>
                <ul className="m-0 p-0 list-none flex flex-col gap-[0.5vw]">
                  <li><a href="#" className="no-underline text-white">Instagram</a></li>
                  <li><Link href="#" className="no-underline text-white">LinkedIn</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
