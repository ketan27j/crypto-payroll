import { Button } from "./button";
import { useRouter } from "next/navigation";

interface AppbarProps {
    user? : {
        name? : string | null;
    }
    onSignin : any,
    onSignout : any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    const router = useRouter();
    return (
        <div className="flex justify-between items-center bg-[#541263] p-1 shadow-lg">
            <div className="flex items-center">
                <Image
                    src="/Crypto_fin_zone_logo.jpeg"
                    alt="Crypto Fin Zone Logo"
                    width={60}
                    height={60}
                    className="mr-2 rounded-full"
                />
                <div className="text-2xl font-bold text-white hidden sm:block">
                    Crypto Finance <span className="text-sm">Zone</span>
                </div>
            </div>
            {/* Rest of the appbar content */}
            <div className="flex items-center space-x-2">
                {user && (
                    <>
                        {/* <span className="text-white text-sm mr-2">Welcome, {user.name}</span> */}
                        <button onClick={() => router.push("./dashboard")} className="text-white hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </>
                )}
                <button onClick={user ? onSignout : onSignin} 
                className="text-2xl mr-10  text-white hover:text-gray-200">
                    {user ? (
                        // <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        // </svg>
                        <span>Logout</span>
                    ) : (
                        // <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        // </svg>
                        <span className="">Login</span>

                    )}
                </button>
            </div>
        </div>
    );
}

import Image from 'next/image';
