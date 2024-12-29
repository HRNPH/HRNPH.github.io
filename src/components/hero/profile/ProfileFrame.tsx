export default function ProfileFrame({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-lg border-4 border-gray-100 shadow-lg">
        <img
          src="/images/me/pf-long.jpg"
          alt="Your Portrait"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
