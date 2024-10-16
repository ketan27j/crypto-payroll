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
            <a href="/" className="flex items-center cursor-pointer">
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
            </a>
            {/* Rest of the appbar content */}            
            <div className="flex items-center space-x-2">
                {user && (
                    <button onClick={() => router.push("./dashboard")} title="Dashboard" 
                    className="bg-white p-2 rounded text-2xl mr-10  text-black hover:text-blue-800">
                        <HomeIcon></HomeIcon>
                        </button>
                )}
                {/* {user && (
                    <>
                        <button onClick={() => router.push("./dashboard")} className="text-white hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </>
                )} */}
                <button onClick={user ? onSignout : onSignin} 
                className="bg-white p-2 rounded text-2xl mr-10  text-black hover:text-blue-800">
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

function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}