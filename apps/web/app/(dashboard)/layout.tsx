"use client";
import { getServerSession } from "next-auth";
import { SidebarItem } from "../../components/SidebarItem";
import { authOptions } from "../lib/auth";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { CurrentUserState } from "../store/clientAddState";

import { useState, useRef, useEffect } from 'react';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUserState, setCurrentUserState] = useRecoilState(CurrentUserState);
  const sidebarRef = useRef<HTMLDivElement>(null);
  // const session = await getServerSession(authOptions);

  const CanActivate = (roles: string[]) => {
    // return roles.includes(session?.user?.role);
    return roles.includes(currentUserState?.role || '');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  if(currentUserState?.id){
    return (
      <div className="flex relative min-h-screen">
        <button 
          className="fixed top-20 left-4 z-30 mb-15 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div 
            ref={sidebarRef}
            className={`w-72 bg-[#300a24] min-h-screen mr-4 pt-8 shadow-lg fixed top-0 left-0 z-20 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
            <div className="px-4 space-y-3">
              <div>
                <div className="px-4 space-y-3">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl font-bold">
                      {currentUserState ? currentUserState.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-white font-bold">{currentUserState.name}</span>
                  </div>
                  {/* Rest of the sidebar items */}
                </div>
                <hr className="border-gray-500 my-4" />
              </div>
                <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Dashboard" className="text-white text-lg font-medium hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-all duration-200" />
                <SidebarItem href={"/profile"} icon={<AccountIcon />} title="Profile" className="text-white text-lg font-medium hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-all duration-200" />
                { CanActivate(['Admin','ClientAdmin']) &&
                  <SidebarItem href={"/employee"} icon={<EmployeeIcon />} title="Employee Information" className="text-white text-lg font-medium hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-all duration-200" />
                }
                { CanActivate(['Admin']) &&
                  <SidebarItem href={"/client"} icon={<ClientIcon />} title="Client Information" className="text-white text-lg font-medium hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-all duration-200" /> 
                }
                { CanActivate(['Admin','ClientAdmin']) &&
                  // <SidebarItem href={"/fundtransfer"} icon={<TransactionsIcon />} title="Fund Transfer" className="text-white text-lg font-medium hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-all duration-200" />
                  <SidebarItem href={"/payments"} icon={<TransactionsIcon />} title="Payments" className="text-white text-lg font-medium hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-all duration-200" />
                }
                { CanActivate(['Admin','ClientAdmin']) &&
                  <SidebarItem href={"/scheduling"} icon={<SchedulingIcon />} title="Scheduling" className="text-white text-lg font-medium hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-all duration-200" />
                }
                {/* { CanActivate(['Admin','ClientAdmin']) &&
                  <SidebarItem href={"/salaryPayment"} icon={<TransactionsIcon />} title="Salary Payment" className="text-white text-lg font-medium hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-all duration-200" />
                } */}
                { CanActivate(['Admin','ClientAdmin']) &&
                  <SidebarItem href={"/tokenlaunchpad"} icon={<TokenLaunchpadIcon />} title="Token Launchpad" className="text-white text-lg font-medium hover:bg-purple-700 hover:text-purple-100 rounded-lg transition-all duration-200" />
                }
            </div>
        </div>
          {children}
      </div>
    );
  }else {    return (
      <div className="flex min-h-screen w-full items-center justify-center gap-4 p-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Access Denied</h1>
              <p className="text-sm text-gray-500 md:text-base dark:text-gray-400">
                You do not have permission to access this page.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/"
            >
              Return to the homepage
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

// Icons Fetched from https://heroicons.com/
function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}
function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
  
}
function AccountIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
}
function SchedulingIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
}
function TokenLaunchpadIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
}
function EmployeeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
}
function ClientIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>
}
