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
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-300 to-purple-300 p-4 shadow-lg">
            <div className="text-4xl font-bold text-black">
                Crypto Payroll
            </div>
            <div className="flex items-center space-x-4">
                {user && <span className="text-black">Welcome, {user.name} &nbsp;
                   <Button onClick={() => router.push("./dashboard")}>Dashboard</Button> 
                </span>}
                <Button onClick={user ? onSignout : onSignin} >
                    {user ? "Logout" : "Login"}
                </Button>
            </div>
        </div>
    );
}