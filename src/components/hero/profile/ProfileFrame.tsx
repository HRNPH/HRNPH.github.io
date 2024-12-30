import Image from "next/image";
export default function ProfileFrame({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-lg border-4 border-gray-100 shadow-lg">
        <Image
          src="/images/me/pf-long.webp"
          alt="My Portrait"
          className="h-full w-full object-cover"
          width={300}
          height={400}
        />
      </div>
    </div>
  );
}
