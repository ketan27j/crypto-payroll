import { Button } from "./button";

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
    return (
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-300 to-purple-400 p-4 shadow-lg">
            <div className="text-4xl font-bold text-black">
                Whale Alert
            </div>
            <div className="flex items-center space-x-4">
                {user && <span className="text-black">Welcome, {user.name}</span>}
                <Button onClick={user ? onSignout : onSignin} >
                    {user ? "Logout" : "Login"}
                </Button>
            </div>
        </div>
    );
}