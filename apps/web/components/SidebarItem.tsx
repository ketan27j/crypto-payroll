"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon, className }: { href: string; title: string; icon: React.ReactNode,
    className?: string
 }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "text-white" : 
                    "text-white text-lg font-medium hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-all duration-200"
                } cursor-pointer  p-2 pl-3`} onClick={() => {
        router.push(href);
    }}>
        <div className="pr-5">
            {icon}
        </div>
        <div className={`font-bold
            text-white text-sm font-medium hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-all duration-200"
            }`}>
            {title}
        </div>

        {selected && 
        <div className="ml-4">
            {ChevronIcon()}
        </div>}
    </div>
}
function ChevronIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
  
  }
  