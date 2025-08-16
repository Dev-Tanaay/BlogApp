"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState<string>("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (session?.user?.id) {
        const res = await fetch(`/api/user/image?id=${session.user.id}`);
        const data = await res.json();
        setImage(data?.imageUrl || "");
      }
    };
    fetchImage();
  }, [session?.user?.id]);

  if (!mounted) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-5 bg-[#090D1F] z-50">
      <h1 className="text-4xl font-extrabold text-violet-300">Tech Blog</h1>
      {status === "authenticated" ? (
        <img
          src={image || "/default-avatar.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-violet-400 cursor-pointer"
          onClick={() => router.push("/profile")}
        />
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-violet-500 rounded-lg hover:bg-violet-600 transition"
        >
          Login
        </button>
      )}
    </header>
  );
}
