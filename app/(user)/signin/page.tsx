'use client';
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Page() {
    const [username, setUsername] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router=useRouter();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const fullName=`${firstname.trim()} ${lastname.trim()}`;
            if (!username || !firstname || !lastname || !bio || !email || !password) {
                setError("All fields are required");
                return;
            }   
            const data= await fetch("/api/user/signin",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({username, fullName, email, password, bio})
            })
            if(data.ok){
                router.push("/login");
            }
        } catch (error:any) {
            setError(error);
        }finally{
            setLoading(false);
            setError(null);
        }
        
        setError(null);
        console.log("su");
    }

    const handleVisibility = () => {
        setVisible((prev) => !prev);
    }

    return (
        <div>
            <div className="my-5 flex justify-center items-center min-h-screen">
                <form
                    onSubmit={handleSubmit}
                    className="p-6 border-2 border-white rounded shadow-md w-1/3 text-white"
                >
                    <label className="w-full bg-white p-5 text-black text-center text-4xl font-semibold inline-block rounded-2xl my-3 shadow-sm shadow-violet-400">
                        SignUp!
                    </label>

                    <label className="block my-3 text-2xl font-semibold">UserName</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        required
                        className="w-full bg-white py-3 px-5 mb-3 placeholder-black text-black rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <div className="flex justify-between gap-4">
                        <div className="w-1/2">
                            <label className="block my-3 text-2xl font-semibold">FirstName</label>
                            <input
                                type="text"
                                placeholder="Enter your firstname"
                                required
                                className="w-full bg-white py-3 px-5 mb-3 placeholder-black text-black rounded"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block my-3 text-2xl font-semibold">LastName</label>
                            <input
                                type="text"
                                placeholder="Enter your lastname"
                                required
                                className="w-full bg-white py-3 px-5 mb-3 placeholder-black text-black rounded"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                    </div>

                    <label className="block my-3 text-2xl font-semibold">Bio</label>
                    <textarea
                        cols={10}
                        placeholder="Tell me about yourself..."
                        required
                        className="w-full bg-white py-3 px-5 mb-3 placeholder-black text-black rounded"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />

                    <label className="block my-3 text-2xl font-semibold">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full bg-white py-3 px-5 mb-3 placeholder-black text-black rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="block my-3 text-2xl font-semibold">Password</label>
                    <div className="flex">
                        <input
                            type={visible ? "text" : "password"}
                            placeholder="Enter your password"
                            required
                            className="w-11/12 bg-white py-3 px-5 mb-3 placeholder-black text-black rounded-l"
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
                    >
                        {loading ? (
                            <span className="flex justify-center">
                                <Spinner />
                            </span>
                        ) : (
                            "Register"
                        )}
                    </button>

                    <Link href="/login">
                        <p>
                            Already have an account?{" "}
                            <span className="text-blue-400 underline">Login</span>
                        </p>
                    </Link>
                </form>
            </div>
        </div>
    )
}
