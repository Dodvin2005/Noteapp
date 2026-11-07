"use client"
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { FaPen, FaTrash, FaCalendarAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Note {
    _id:string;
    title:string;
    description:string;
    color:string;
    usermail:string;
    createdAt:string;
}

export default function dashboard() {

    const { data: session, status } = useSession()
    const router = useRouter()

    const [allNotes,setAllNotes] = useState<Note[]>([])

    console.log(allNotes);

    useEffect(()=>{
        if(session?.user?.email){
            fetchNotes()
        }
    },[session])

    useEffect(()=>{
        if(status == "unauthenticated"){
            router.replace('/login')
        }
    },[status,router])


    const fetchNotes = async ()=>{
        try {
            const res = await fetch(`/api/notes?email=${session?.user?.email}`)

            const serverResponse = await res.json()

            if(res.ok){
                setAllNotes(serverResponse)
            }
            else{
                toast.error("Failed to fetch notes")
            }

        } catch (error) {
            toast.error("Something went wrong")
        }
    }


    if (status == "loading") {
        return <p className='text-center mt-10 text-2xl'>Loading...</p>
    }

    if (status == "unauthenticated") {
        return <p className='text-center mt-10 text-2xl'>Redirecting...</p>
    }


    const deletenote = async(id:string)=>{
        try {

            const res = await fetch(`/api/notes/${id}`,{
                method:"DELETE"
            })

            if(res.ok){
                toast.success("Note deleted successfully")
                fetchNotes()
            }
            else{
                toast.error("Failed to delete note")
            }

        } catch (error) {
            toast.error("Something went wrong")
        }
    }


    return (
        <div className="min-h-screen bg-gray-100">

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">

                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">

                    {/* Heading */}
                    <div className="flex justify-between items-center mb-8">

                        <div>
                            <h1 className="text-3xl font-bold text-blue-600">

                                {session?.user?.name} Notes
                            </h1>

                            <p className="text-gray-500 text-sm mt-2">
                                Manage and organize all your notes in one place.
                            </p>
                        </div>

                        <span className="text-sm text-gray-500">
                            {allNotes.length} {allNotes.length == 1 ? "Note" : "Notes"}
                        </span>

                    </div>


                    {/* Notes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        {/* Notes */}
                        {
                            allNotes.length > 0 &&
                            allNotes.map(note=>(

                                <div
                                    key={note?._id}
                                    className={`rounded-lg p-5 min-h-48 shadow-sm hover:shadow-md transition
                                    ${{
                                        blue: 'bg-blue-300',
                                        red: 'bg-red-300',
                                        green: 'bg-green-300',
                                        yellow: 'bg-yellow-300',
                                        purple: 'bg-purple-300',
                                        pink: 'bg-pink-300',
                                        orange: 'bg-orange-300'
                                    }[note?.color] || 'bg-gray-300'}`}
                                >

                                    <div className="flex justify-between items-center mb-3">

                                        <h3 className="font-bold text-gray-800 text-lg">
                                            {note?.title}
                                        </h3>

                                        <Link href={`/notes/add/${note?._id}`}>
                                            <button type="button" className="text-gray-800 text-lg hover:text-blue-700 transition">
                                                <FaPen />
                                            </button>
                                        </Link>

                                    </div>

                                    <p className="text-sm text-gray-700 min-h-10">
                                        {note?.description}
                                    </p>

                                    <div className="flex justify-between items-center mt-5">

                                        <div className="flex items-center gap-2 text-xs text-gray-700">
                                            <FaCalendarAlt />
                                            {new Date(note?.createdAt).toLocaleDateString()}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={()=>deletenote(note?._id)}
                                            className="text-red-700 text-sm hover:text-red-900 transition"
                                        >
                                            <FaTrash/>
                                        </button>

                                    </div>

                                </div>

                            ))
                        }


                        {/* No Notes */}
                        {
                            allNotes.length == 0 &&
                            <div className="col-span-full text-center py-10">

                                <p className="text-gray-500 text-lg">
                                    No notes found. Create your first note!
                                </p>

                            </div>
                        }


                        {/* New Note */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg min-h-48 flex flex-col justify-center items-center gap-2 hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer">

                            <Link href={'/notes/add/'} className="flex flex-col items-center">

                                <IoMdAdd className="text-5xl font-light text-blue-600" />

                                <div className="text-sm font-semibold text-gray-800">
                                    New Note
                                </div>

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}