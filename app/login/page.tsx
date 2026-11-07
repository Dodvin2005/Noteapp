"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function login() {

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    });
    const handleLogin = async (e: any) => {

        e.preventDefault();

        const { email, password } = userDetails;

        // Check empty fields
        if (!email || !password) {

            toast.error("Please fill the form completely!");

        } else {
            const res = await signIn("credentials", {
                email, password, redirect: false
            })
            console.log(res);
            if (res?.ok) {
                toast.success("Login Sucessfull")
                setTimeout(() => {

                    window.location.href = "/notes"
                }, 2000);

            } else {
                toast.error("invalid Credentials")
            }
            setUserDetails({ email: "", password: "" })

        }
    }



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-green-500 p-8 rounded-xl w-100 shadow-lg">

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-white">NOTEHUB</h1>
                    <p className="text-blue-100 mt-2">Note Everything You need to Remember</p>
                    <div className="mt-3">
                        <Link href={'/login'}></Link>
                    </div>
                </div>

                <form>
                    <div className="mt-5 mb-4 w-full">
                        <input onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} type="text" placeholder="Email" className="bg-white p-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-300" />
                    </div>

                    <div className="mb-5 w-full">
                        <input onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder="Password" className="bg-white p-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-300" />
                    </div>
                </form>

                <div className="mb-3 flex flex-col items-center text-white">
                    <button onClick={handleLogin} type="submit" className="bg-green-700 hover:bg-blue-800 transition duration-300 rounded-lg px-5 py-3 w-full font-semibold">
                        Login
                    </button>

                    <span className="mt-4 text-sm">
                        New User? Click <Link href={'/register'} className="underline text-blue-200 font-semibold hover:text-white">Register</Link>
                    </span>
                </div>

            </div>
        </div>
    )
}