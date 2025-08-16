"use client";

import { useSession } from "next-auth/react";

export default function BlogPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You must log in to view this page</p>;

  return <h1 className="text-9xl font-extrabold text-violet-300">Tech Blog</h1>;
}
