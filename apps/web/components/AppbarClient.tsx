"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar onSignin={async () => { 
        try{
          await signIn()
          toast.success("Login successful")
          router.push("/dashboard") 
        } catch (error) {
          toast.error('Username or password is incorrect');
        }
      }} onSignout={async () => {
        try{
          await signOut()
          router.push("/api/auth/signin")
          toast.success("Logout successful")
        } catch (error) {
          toast.error('Error occured');
        }
      }} user={session.data?.user} />
   </div>
  );
}