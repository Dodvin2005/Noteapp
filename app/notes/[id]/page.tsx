"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCircle } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

export default function updatenotes() {
    const [noteDetails, setNoteDetails] = useState({
            _id:"",
            title:"",
            description:"",
            color:"",
            userMail:"",
            createdAt:"",
            updatedAt:""
            
        })
        console.log(noteDetails);

    const { status } = useSession()
    const { id } = useParams()

    useEffect(() => {
        viewNote()
    }, [id])

    const viewNote = async () => {
        const res = await fetch(`/api/notes/${id}`)
        const serverResponse = await res.json()
        console.log(serverResponse);

    }

     if (status == "loading") {
        return <p className='text-center mt-10 text-2xl'>Loading...</p>
      }
    
    
      if (status == "unauthenticated") {
        redirect('/login')
      }

      const handleUpdate = async ()=>{
        const {title,description,color} =noteDetails
        if(!title || !description || !color){
            toast.error("please fill the form completely")
        }else{
              const res = await fetch(`/api/notes/${id}`,{method:"PUT",body:JSON.stringify(noteDetails)})
              if(res.status==200){
                toast.success("Note updated successfully")
                redirect('/notes')
              }
        }
      }
    
    return (
        <div className="flex justify-center items-center h-150">
            <div className="shadow rounded p-5 w-150">
                <div className="mb-2" >
                    <Link href={'/notes'}>
                        <p className="text-3xl font-bold text-blue-500">NoteApp</p>
                    </Link>
                    <p className="text-gray-600 font-medium">Add notes</p>
                </div>
                <div className="flex justify-between items-center">
                    <MdOutlineClose onClick={viewNote} className="text-3xl hover:scale-110 transition-transform duration-300 cursor-pointer" />
                    <button onClick={handleUpdate} className="text-white bg-pink-700 w-fit px-3 py-1 rounded-lg hover:scale-110 transition-transform duration-300 cursor-pointer">update</button>
                </div>
                <div className="my-5 flex justify-around">
                   <div onClick={() => setNoteDetails({ ...noteDetails, color: "white" })} className={noteDetails.color == "white" ? "w-5 h-5 rounded-full bg-gray-100 cursor-pointer border" : "w-5 h-5 rounded-full bg-gray-100 cursor-pointer "}></div>

          <div onClick={() => setNoteDetails({ ...noteDetails, color: "yellow" })} className={noteDetails.color == "yellow" ? "w-5 h-5 rounded-full bg-yellow-400 cursor-pointer border" : "w-5 h-5 rounded-full bg-yellow-400 cursor-pointer"}></div>

          <div onClick={() => setNoteDetails({ ...noteDetails, color: "red" })} className={noteDetails.color == "red" ? "w-5 h-5 rounded-full bg-red-300 cursor-pointer border" : "w-5 h-5 rounded-full bg-red-300 cursor-pointer"}></div>

          <div onClick={() => setNoteDetails({ ...noteDetails, color: "green" })} className={noteDetails.color == "green" ? "w-5 h-5 rounded-full bg-emerald-300 cursor-pointer border" : "w-5 h-5 rounded-full bg-emerald-300 cursor-pointer"}></div>

          <div onClick={() => setNoteDetails({ ...noteDetails, color: "blue" })} className={noteDetails.color == "blue" ? "w-5 h-5 rounded-full bg-blue-400 cursor-pointer border" : "w-5 h-5 rounded-full bg-blue-400 cursor-pointer"}></div>
                </div>
                <div className="flex flex-col">
                    <input value={noteDetails.title} onChange={e => setNoteDetails({ ...noteDetails, title: e.target.value })} className="px-3 py-1 my-2" type="text" placeholder="Title" />
                    <input value={noteDetails.description} onChange={e => setNoteDetails({ ...noteDetails, description: e.target.value })} className="px-3 py-1 h-20 my-2" type="text" placeholder="Description" />
                </div>
            </div>
        </div>
    )
}