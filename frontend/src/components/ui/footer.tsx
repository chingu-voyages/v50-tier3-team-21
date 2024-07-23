export default function Footer() {
  return (
    <div className="hidden md:flex items-center justify-center flex-col">
      <hr className="border-primary border w-[95%]" />
      <div className="flex items-center justify-center h-24 gap-3">
        <p>All rights Reserverd</p>
        <span className="text-2xl">©</span>
        <p className="font-bold">Hungry Hippo 2024</p>
      </div>
    </div>
  );
}
