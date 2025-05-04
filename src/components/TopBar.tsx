"use client";
import { ArrowRightToLine } from "lucide-react";
import React, { useContext, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Profile from "./Profile";
import { DashboardContext } from "@/hooks/dashboardContext";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

export const DashBoardTopBar = ({ session }: { session: any }) => {
  const pathname = usePathname();
  const { toggle, setToggle } = useContext(DashboardContext);
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="w-full flex bg-[var(--nav-bg)] h-[50px] items-center justify-between px-4">
      <div className="flex flex-row-reverse justify-around items-center gap-2">
        <span className="font-bold text-3xl">MapNest</span>
        <div
          className="border-3 p-1 md:hidden border-grey rounded-lg hover:bg-black hover:cursor"
          onClick={() => setToggle((prev: boolean) => !prev)}
        >
          <ArrowRightToLine color="grey" />
        </div>
      </div>

      <div className="relative flex gap-5 items-center" ref={dropdownRef}>
        <button
          className="bg-[var(--button-bg)] rounded-sm hover:shadow-md text-white hover:cursor-pointer p-1 px-3"
          onClick={() => getShareUrl(pathname)}
        >
          Share
        </button>

        <div
          onClick={() => setShowProfile(prev => !prev)}
          className="rounded-full border border-black overflow-hidden w-8 h-8 cursor-pointer"
        >
          <Image
            src={session?.user?.image || "/logo.png"}
            alt="Profile"
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
        </div>
        

        {showProfile && <Profile session={session} show={true} />}
        
      </div>
    </div>
  );
};

export function getShareUrl(pathname: string) {
  const match = pathname.match(/^\/dashboard\/m\/([^/]+)$/);
  try {
    if (!match) throw new Error("❌ Sharing is only allowed from /dashboard/m/[mapId] routes.");

    const mapId = match[1];
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    navigator.clipboard.writeText(`${origin}/share/${mapId}`);
    toast.success("Link copied to clipboard");
  } catch (error) {
    toast.error("Can't share!");
  }
}
