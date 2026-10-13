import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen bg-light-main flex items-center justify-center">
      <div className="text-link-hover">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    </div>
  );
}
