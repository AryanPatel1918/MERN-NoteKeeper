import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import { SquarePen, Trash2 } from 'lucide-react'
import { toast } from "react-hot-toast"
import DeleteModal from "./DeleteModal"

export default function NoteCard({ note, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const navigate = useNavigate()

  function openModal(e) {
    e.stopPropagation()
    setShowDeleteModal(true)
  }

  async function handleDelete(e) {
    // e.stopPropagation() only use if not using DeleteModal
    try {
      await axios.delete(`http://localhost:5000/api/notes/${note._id}`)
      toast.success("Note deleted successfully")
      onDelete(note._id)
    } catch (error) {
      if (error.response?.status === 429) {
        toast("Slow down. Please wait a few seconds before trying again.", {
          icon: "⌛"
        })
      } else if (error.response) {
        console.log(error.response)
        toast.error(`${error.response.status} Error: ${error.response.data?.error || "Server error"}`)
      } else {
        console.log(`Error: ${error.message}`)
        toast.error("Network error or server not reachable")
      }
    }
  }

  return (
    <>
      <div onClick={() => navigate(`/notes/${note._id}`)} title="View Note" className="card bg-base-300 shadow-md cursor-pointer hover:shadow-[#00FF9D] transition-all duration-200 border-t-4 border-[#00FF9D]">
        <div className="card-body p-6">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/80 line-clamp-3 break-all">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className=" text-base-content/60">
              {new Date(note.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit"
              })}
            </span>
            <div className="flex items-center gap-3">
              <button onClick={handleDelete} className="hover:bg-slate-800 p-1.5 rounded-full" title="Edit">
                <SquarePen className="size-5 text-base-content" />
              </button>
              <button onClick={openModal} className="hover:bg-slate-800 p-1.5 rounded-full" title="Delete">
                <Trash2 className="size-5 text-red-500" />
              </button>  
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && <DeleteModal closeModal={() => setShowDeleteModal(false)} deleteNote={handleDelete} noteTitle={note.title} />}
    </>
  )
}
