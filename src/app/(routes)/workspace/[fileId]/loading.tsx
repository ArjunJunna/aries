import Image from "next/image";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-2 bg-slate-100">
      <Image
        src="/aries-logo-v1.png"
        width={200}
        height={200}
        alt="Aries logo"
      />

      <div className="flex flex-col items-center gap-y-1">
        <p className="font-mono text-xl font-semibold tracking-wider text-gray-500">
          Loading
        </p>
        <Loader2 size={16} className="animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
