"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaTimes, FaCheck, FaPen } from 'react-icons/fa'

export default function addnote() {

  const { data: session, status } = useSession()
  console.log(session, status);


  const [noteDetails, setNoteDetails] = useState({
    title: "", description: "", color: "", userMail: session?.user?.email
  })

  if (status == "loading") {
    return <p className='text-center mt-10 text-2xl'>Loading...</p>
  }


  if (status == "unauthenticated") {
    redirect('/login')
  }

  const resetButton = () => {
    setNoteDetails({ title: "", description: "", color: "", userMail: session?.user?.email })
  }

  const handleAddNote = async () => {
    const userMail = session?.user?.email
    const { title, description, color } = noteDetails
    if (!title || !description || !color || !userMail) {
      toast.error("please fill the form completely")
    } else {
      const res = await fetch('/api/notes', { method: "POST", body: JSON.stringify(noteDetails) })
      if (res.status == 201) {
        toast.success("Note Added Successfully")
        resetButton()
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-10">

      {/* Main Container */}
      <div className="w-full max-w-lg bg-white p-6 md:p-8 rounded-xl shadow-sm">

        {/* Heading */}
        <div className="mb-5">

          <Link href={'/notes'}>
            <h1 className="text-2xl font-bold text-sky-600">
              NoteApp
            </h1>
          </Link>

          <p className="text-sm text-gray-500 mt-1">
            Add notes
          </p>

        </div>

        {/* Close and Save Buttons */}
        <div className="flex justify-between items-center mb-6">

          <button onClick={resetButton} className="text-xl text-gray-700 hover:text-red-500 transition">
            <FaTimes />
          </button>

          <button onClick={handleAddNote} className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-sm transition">

            save
            <FaCheck />

          </button>

        </div>

        {/* Note Colors */}
        <div className="flex items-center gap-5 mb-8">

          <div onClick={() => setNoteDetails({ ...noteDetails, color: "white" })} className={noteDetails.color == "white" ? "w-5 h-5 rounded-full bg-gray-100 cursor-pointer border" : "w-5 h-5 rounded-full bg-gray-100 cursor-pointer "}></div>

          <div onClick={() => setNoteDetails({ ...noteDetails, color: "yellow" })} className={noteDetails.color == "yellow" ? "w-5 h-5 rounded-full bg-yellow-400 cursor-pointer border" : "w-5 h-5 rounded-full bg-yellow-400 cursor-pointer"}></div>

          <div onClick={() => setNoteDetails({ ...noteDetails, color: "red" })} className={noteDetails.color == "red" ? "w-5 h-5 rounded-full bg-red-300 cursor-pointer border" : "w-5 h-5 rounded-full bg-red-300 cursor-pointer"}></div>

          <div onClick={() => setNoteDetails({ ...noteDetails, color: "green" })} className={noteDetails.color == "green" ? "w-5 h-5 rounded-full bg-emerald-300 cursor-pointer border" : "w-5 h-5 rounded-full bg-emerald-300 cursor-pointer"}></div>

          <div onClick={() => setNoteDetails({ ...noteDetails, color: "blue" })} className={noteDetails.color == "blue" ? "w-5 h-5 rounded-full bg-blue-400 cursor-pointer border" : "w-5 h-5 rounded-full bg-blue-400 cursor-pointer"}></div>

        </div>

        {/* Title Input */}
        <div className="mb-5">

          <input value={noteDetails.title} onChange={e => setNoteDetails({ ...noteDetails, title: e.target.value })}
            type="text"
            placeholder="Title"
            className="w-full px-2 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none border-b border-gray-100 focus:border-blue-300" />

        </div>

        {/* Description */}
        <div>

          <textarea value={noteDetails.description} onChange={e => setNoteDetails({ ...noteDetails, description: e.target.value })}
            placeholder="Description"
            className="w-full px-2 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none resize-none border-b border-gray-100 focus:border-blue-300"
          />

        </div>

        {/* Bottom Right Icon */}
        <div className="flex justify-end mt-3">

          <FaPen className="text-gray-400 text-sm" />

        </div>

      </div>

    </div>
  )
}