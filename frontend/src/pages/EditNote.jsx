import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { Trash2 } from "lucide-react"
import { toast } from 'react-hot-toast'
import LoadingOverlay from "../components/LoadingOverlay"
import BackendErrorState from "../components/BackendErrorState"
import NoteNotFoundState from "../components/NoteNotFoundState"
import RateLimitedUI from "../components/RateLimitedUI"
import BackButton from "../components/BackButton"
import DeleteModal from "../components/DeleteModal"

export default function EditNote() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notFound, setNotFound] = useState(false)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [error, setError] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  const { id } = useParams()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()
    if (!trimmedTitle || !trimmedContent) {
      toast("Title or Content cannot be empty", {
        icon: "⚠️",
        style: {
          border: "1px solid #facc15",
          color: "#854d0e",
          background: "#fef9c3"
        }
      })
      return
    }

    setIsSaving(true)
    
    try {
      await axios.put(`/api/notes/${id}`, {
        title: trimmedTitle,
        content: trimmedContent
      })
      toast.success("Note updated successfully")
      navigate('/')
    } catch (error) {
      if (error.response?.status === 429) {
        toast("You're making changes too quickly. Please wait a few seconds before trying again.", {
          icon: "⌛"
        })
      } else if (error.response) {
        console.log(error.response)
        toast.error(`${error.response.status} Error: ${error.response.data?.error || "Server error"}`)
      } else {
        console.log(`Error: ${error.message}`)
        toast.error("Network error or server not reachable")
      }
    } finally {
      setIsSaving(false)
    }
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
        setTitle(res.data.title)
        setContent(res.data.content)
      })
      .catch(error => {
        console.log(error)
        if (error.response?.status === 429) {
          setIsRateLimited(true)
          toast("Slow down! Please wait a few seconds before trying again.", {
            icon: "⌛"
          })
        } else if (error.response?.status === 404) {
          setNotFound(true)
          toast.error("Note not found")
        } else {
          setError(true)
          toast.error("Failed to load note")
        }
      })
      .finally(() => setIsFetching(false))
  }, [id])


  return (
    <>
      <div className="min-h-screen bg-base-200 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <BackButton />
            {!isFetching && !notFound && !isRateLimited && !error && (
              <button onClick={() => setShowDeleteModal(true)} className="btn border text-[13px] sm:text-[14px] border-red-500 text-sm text-red-500 hover:text-slate-800 hover:bg-red-500 p-3 rounded-full gap-1 sm:gap-2">
                <Trash2 className="size-4 sm:size-5" />
                Delete
              </button> 
            )}
          </div>

          {isFetching ? (
            <LoadingOverlay />
          ) : notFound ? (
            <div className="-mt-4 sm:-mt-8">
              <NoteNotFoundState />
            </div>
          ) : isRateLimited ? (
            <div className="-mt-4 sm:-mt-8">
              <RateLimitedUI />
            </div>
          ) : error ? (
            <div className="-mt-4 sm:-mt-8">
              <BackendErrorState />
            </div>
          ) : (
            <div className="card bg-[hsl(0_0_12%)] mt-4 sm:mt-6">
              <div className="card-body relative p-4 sm:p-8">
                <h2 className="card-title text-xl sm:text-2xl mb-5 sm:mb-6">Edit Note</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
                  <label className="flex flex-col w-full sm:w-[50%] gap-1 sm:gap-2">
                    <span className="font-medium sm:text-lg">Title</span>
                    <input className="input rounded-xl input-bordered focus:outline-0 h-10 p-2 sm:p-3" value={title} onChange={e => setTitle(e.target.value)} placeholder="Grocery List" />
                  </label>
                  <label className="flex flex-col gap-1 sm:gap-2">
                    <span className="font-medium sm:text-lg">Content</span>
                    <textarea className="input rounded-xl input-bordered focus:outline-0 h-56 p-2 sm:p-3" rows={7} value={content} onChange={e => setContent(e.target.value)} placeholder="Apples, bread, cheese, french fries" />
                  </label>
                  <button className="btn btn-sm sm:btn-md h-10 sm:h-12 sm:text-[15px] btn-primary ml-auto mt-2" disabled={isSaving}>{isSaving ? "Updating..." : "Save Changes"}</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      {showDeleteModal && <DeleteModal closeModal={() => setShowDeleteModal(false)} deleteNote={handleDelete} noteTitle={title} />}
    </>
  )
}