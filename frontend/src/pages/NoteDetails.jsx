import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { SquarePen, Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"
import LoadingOverlay from "../components/LoadingOverlay"
import BackButton from "../components/BackButton"
import DeleteModal from "../components/DeleteModal"

export default function NoteDetails() {
  const [note, setNote] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  const { id } = useParams()
  const navigate = useNavigate()

  function navigateToEditNote() {
    navigate(`/edit/${note._id}`)
  }

  async function handleDelete() {
    try {
      await axios.delete(`/api/notes/${id}`)
      toast.success("Note deleted successfully")
      navigate('/')
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

  useEffect(() => {
    axios.get(`/api/notes/${id}`)
      .then(res => {
        setNote(res.data)
        console.log(res)
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 429) {
            toast("Slow down! Please wait a few seconds before trying again.", {
              icon: "⌛"
            })
            return
          }
          toast.error(`${error.response.status} Error: ${error.response.data?.error || "Server error"}`)
        } else {
          console.log(`Error: ${error.message}`)
          toast.error("Failed to load note")
        }
      })
      .finally(() => setIsFetching(false))
  }, [])


  return (
    <>
      <div className="min-h-screen bg-base-200 mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2 sm:mb-6">
              <BackButton />
              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={navigateToEditNote} className="btn border text-[13px] sm:text-[14px] border-base-content text-base-content hover:bg-base-content hover:text-base-100 p-3 rounded-full gap-1 sm:gap-2">
                  <SquarePen className="size-4 sm:size-5" />
                  Edit
                </button>
                <button onClick={() => setShowDeleteModal(true)} className="btn border text-[13px] sm:text-[14px] border-red-500 text-sm text-red-500 hover:text-slate-800 hover:bg-red-500 p-3 rounded-full gap-1 sm:gap-2">
                  <Trash2 className="size-4 sm:size-5" />
                  Delete
                </button> 
              </div>
            </div>
            {isFetching ? <LoadingOverlay /> : (
              <div className={`card bg-[hsl(0_0_12%)] transition-opacity duration-500 ${isFetching ? "opacity-0" : "opacity-100"}`}>
                <div className="card-body p-4 sm:p-7 max-h-[500px] sm:max-h-[550px]">
                    <h1 className="text-lg sm:text-2xl font-medium break-words mb-2">{note.title}</h1>
                    <p className="text-base rounded-xl sm:text-lg overflow-y-auto text-base-content/90 whitespace-pre-wrap sm:leading-relaxed break-words">{note.content}</p>
                </div>
              </div>
            )}
          </div>
      </div>
      {showDeleteModal && <DeleteModal closeModal={() => setShowDeleteModal(false)} deleteNote={handleDelete} noteTitle={note.title} />}
    </>
  )
}