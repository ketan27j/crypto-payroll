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
        <div className={`font-bold ${selected ? "text-lg text-purple-300" : 
            "text-white text-sm font-medium hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-all duration-200"
            }`}>
            {title}
        </div>
    </div>
}