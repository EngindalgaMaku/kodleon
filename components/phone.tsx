import Image from "next/image";

/** A real screenshot in a phone body */
export function Phone({ src, alt, className = "", priority = false, sizes = "280px" }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={`rounded-[2.1rem] bg-[#08090b] p-[7px] shadow-[0_30px_60px_-20px_rgba(10,12,16,.55)] ring-1 ring-white/25 ${className}`}>
      <div className="overflow-hidden rounded-[1.7rem] bg-black">
        <Image src={src} alt={alt} width={780} height={1688} sizes={sizes} priority={priority} className="block h-auto w-full" />
      </div>
    </div>
  );
}
