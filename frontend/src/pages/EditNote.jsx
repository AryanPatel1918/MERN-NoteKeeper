import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from 'react-hot-toast'
import LoadingOverlay from "../components/LoadingOverlay"
import BackButton from "../components/BackButton"

export default function EditNote() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isFetching, setIsFetching] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:5000/api/notes/${id}`)
      .then(res => {
        setTitle(res.data.title)
        setContent(res.data.content)
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
      await axios.put(`http://localhost:5000/api/notes/${id}`, {
        title: trimmedTitle,
        content: trimmedContent
      })
      toast.success("Note updated successfully")
      navigate('/')
    } catch (error) {
      if (error.response?.status === 429) {
        toast("You're creating notes too quickly. Please wait a few seconds before trying again.", {
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

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <BackButton />

          <div className="card bg-[hsl(0_0_12%)]">
            <div className="card-body relative p-4 sm:p-8">
              {isFetching && <LoadingOverlay />}
              
              <div className={`transition-opacity duration-500 ${isFetching ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <h2 className="card-title text-xl sm:text-2xl mb-5 sm:mb-6">Edit Note</h2>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
                    <label className="flex flex-col w-full sm:w-[50%] gap-2">
                      <span className="font-medium sm:text-lg">Title</span>
                      <input className="input input-bordered focus:outline-0 h-10 p-3" value={title} onChange={e => setTitle(e.target.value)} placeholder="Grocery List" />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="font-medium sm:text-lg">Content</span>
                      <textarea className="input rounded-r-none input-bordered focus:outline-0 h-full p-3 sm:p-4" rows={5} value={content} onChange={e => setContent(e.target.value)} placeholder="Apples, bread, cheese, french fries" />
                    </label>
                    <button className="btn btn-sm sm:btn-md h-10 sm:h-12 sm:text-[15px] btn-primary ml-auto mt-2" disabled={isSaving}>{isSaving ? "Updating..." : "Save Changes"}</button>
                  </form>
              </div>
                
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
