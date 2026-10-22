import { PackageOpen } from "lucide-react";

export default function NoData() {
  return (
    <div className="w-full h-100 flex flex-col items-center justify-center">
      <PackageOpen className="w-20 h-20 text-link-hover" />
      <p className="font-medium text-base leading-[130%] mt-4">Ma'lumot topilmadi!</p>
    </div>
  );
}
