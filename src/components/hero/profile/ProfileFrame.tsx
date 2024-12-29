export default function ProfileFrame({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative max-w-md w-full aspect-[3/4] rounded-lg overflow-hidden border-4 border-gray-100 shadow-lg">
        <img
          src="/images/me/pf-long.jpg"
          alt="Your Portrait"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
