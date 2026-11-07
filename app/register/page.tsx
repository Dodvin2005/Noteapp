"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {

    const router = useRouter();

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);


    // REGISTER FUNCTION

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const { name, email, password } = userDetails;

        // Check empty fields
        if (!name || !email || !password) {

            toast.error("Please fill the form completely!");

            return;

        }

        try {

            setLoading(true);

            // API CALL
            const res = await fetch('/api/register', {

                method: "POST",

              

                body: JSON.stringify(userDetails)

            });

            const serverResponse = await res.json();

            console.log(serverResponse);

            // SUCCESS
            if (res.status === 201) {

                toast.success(serverResponse.message);

                setUserDetails({
                    name: "",
                    email: "",
                    password: ""
                });

                setTimeout(() => {

                    router.push('/login');

                }, 2000);

            }

            // ERROR
            else {

                toast.error(serverResponse.message);

            }

        }

        catch (err) {

            console.log(err);

            toast.error("Something went wrong. Please try again!");

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-green-500 p-8 rounded-xl w-100 shadow-lg">

                {/* HEADER */}

                <div className="text-center mb-6">

                    <h1 className="text-3xl font-bold text-white">
                        NOTEHUB
                    </h1>

                    <p className="text-blue-100 mt-2">
                        Note Everything You Need to Remember
                    </p>

                    <h3 className="text-white font-bold mt-3">
                        Register...
                    </h3>

                </div>


                {/* REGISTRATION FORM */}

                <form onSubmit={handleRegister}>

                    {/* NAME */}

                    <div className="mt-5 mb-4 w-full">

                        <input

                            onChange={e => setUserDetails({
                                ...userDetails,
                                name: e.target.value
                            })}

                            value={userDetails.name}

                            type="text"

                            placeholder="Name"

                            required

                            className="bg-white p-3 w-full rounded-xl outline-none"

                        />

                    </div>


                    {/* EMAIL */}

                    <div className="mt-5 mb-4 w-full">

                        <input

                            onChange={e => setUserDetails({
                                ...userDetails,
                                email: e.target.value
                            })}

                            value={userDetails.email}

                            type="email"

                            placeholder="Email"

                            required

                            className="bg-white p-3 w-full rounded-xl outline-none"

                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="mb-5 w-full">

                        <input

                            onChange={e => setUserDetails({
                                ...userDetails,
                                password: e.target.value
                            })}

                            value={userDetails.password}

                            type="password"

                            placeholder="Password"

                            required

                            minLength={6}

                            className="bg-white p-3 w-full rounded-xl outline-none"

                        />

                    </div>


                    {/* REGISTER BUTTON */}

                    <div className="mb-3 flex flex-col items-center text-white">

                        <button

                            type="submit"

                            disabled={loading}

                            className="bg-green-700 hover:bg-green-800 transition duration-300 rounded-lg px-5 py-3 w-full font-semibold disabled:opacity-50"

                        >

                            {loading ? "Registering..." : "Register"}

                        </button>


                        {/* LOGIN LINK */}

                        <span className="mt-4 text-sm">

                            Already User? Click{" "}

                            <Link

                                href={'/login'}

                                className="underline text-blue-200 font-semibold hover:text-white"

                            >

                                Login

                            </Link>

                        </span>

                    </div>

                </form>

            </div>

        </div>

    );

}