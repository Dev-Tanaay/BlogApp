"use client";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function Page(){
  const router=useRouter();
  const handleSignIn=()=>{
    router.push("/signin");
  }
  const handleLoginIn=()=>{
    router.push("/login");
  }
  return(<>
    <Header handleSignIn={handleSignIn} handleLoginIn={handleLoginIn}/>
  </>);
}