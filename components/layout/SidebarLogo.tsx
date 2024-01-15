"use router";
import { useRouter } from "next/navigation";
import Image from "next/image";
import XBlack from "@/public/images/X-Logo-PNG.png";
import { useTheme } from "next-themes";
import XWhite from "@/public/images/X-White-Logo-PNG.png";

const SidebarLogo = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <div
      onClick={() => router.push("/")}
      className="
        rounded-full 
        h-18
        w-18
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-gray-300 
        hover:bg-opacity-10 
        cursor-pointer
    "
    >
      <Image
        alt=""
        src={theme === "light" ? XBlack : XWhite}
        height={30}
        width={30}
      />
    </div>
  );
};

export default SidebarLogo;
