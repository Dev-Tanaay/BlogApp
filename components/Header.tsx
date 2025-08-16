import React from "react";

interface HeaderProps {
  handleSignIn: React.MouseEventHandler<HTMLButtonElement>;
  handleLoginIn: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Header({handleSignIn,handleLoginIn}:HeaderProps){
    return(
        <>
        <div className="flex mx-5 mt-3 py-6  justify-between border-b-2">
            <h1 className="mx-5 text-4xl font-bold">TECH BLOG</h1>
            <div className="space-x-8">
                <button className="hover:underline" onClick={handleSignIn}>Register</button>
                <button className="bg-green-300 px-6 py-2 rounded-lg shadow-sm shadow-green-500 text-black" onClick={handleLoginIn}>login</button>
            </div>
        </div>
        </>
    );
}