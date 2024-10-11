"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getUserInfoByEmail } from "../app/lib/actions/employee";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CurrentUserState } from "../app/store/clientAddState";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  const [currentUserState, setCurrentUserState] = useRecoilState(CurrentUserState);

  useEffect(() => {
    const getUserInfo = async () => {
      if(session && session.data?.user && session.data?.user.email) {
        let userInfo = await getUserInfoByEmail(session.data?.user.email);
        if(userInfo) {
          setCurrentUserState(userInfo);
        }
      }
    }
    getUserInfo();
  }, [session.status, router]);

  return (
   <div>
      <Appbar onSignin={async () => { 
        try{
          await signIn();
          toast.success("Login successful")
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