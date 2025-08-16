"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/components/Spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/blog");
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const handleVisibility = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 border-2 border-white rounded shadow-md w-1/3 text-white"
      >
        <label className="w-full bg-white p-5 text-black text-center text-4xl font-semibold inline-block rounded-2xl my-3 shadow-sm shadow-violet-400">
          Login!
        </label>

        <label className="block my-3 text-2xl font-semibold">Email</label>
        <input
          type="text"
          placeholder="Enter your email"
          className="w-full bg-white py-3 px-5 mb-3 placeholder-black text-black rounded"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block my-3 text-2xl font-semibold">Password</label>
        <div className="flex">
          <input
            type={visible ? "text" : "password"}
            placeholder="Enter your password"
            className="w-11/12 bg-white py-3 px-5 mb-3 placeholder-black text-black rounded-l"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="bg-white text-black px-3 rounded-r mb-3"
            onClick={handleVisibility}
          >
            {visible ? "Hide" : "View"}
          </button>
        </div>

        {error && (
          <div className="bg-red-400 p-2 rounded my-3">
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full my-3 py-3 text-center bg-violet-400 rounded shadow-sm shadow-white text-white text-2xl font-semibold"
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center">
              <Spinner />
            </span>
          ) : (
            "Login"
          )}
        </button>

        <Link href="/signin">
          <p>
            Don't have an account?{" "}
            <span className="text-blue-400 underline">Sign Up</span>
          </p>
        </Link>
      </form>
    </div>
  );
}
