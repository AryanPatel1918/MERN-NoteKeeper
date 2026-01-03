import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { ArrowLeft } from "lucide-react"
import { toast } from 'react-hot-toast'

export default function CreateNote() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  
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

    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/notes', {
        title: trimmedTitle,
        content: trimmedContent
      })
      toast.success("Note created successfully")
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
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeft className="size-5" />
            <span className="text-base">Back to Notes</span>
          </Link>

          <div className="card bg-[hsl(0_0_12%)]">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-5">Create New Note</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col w-[50%] gap-2">
                  <span className="font-medium">Title</span>
                  <input className="input input-bordered focus:outline-0" value={title} onChange={e => setTitle(e.target.value)} placeholder="Grocery List" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-medium">Content</span>
                  <textarea className="input rounded-r-none input-bordered focus:outline-0 w-full h-full p-4" rows={5} value={content} onChange={e => setContent(e.target.value)} placeholder="Apples, bread, cheese, french fries" />
                </label>
                <button className="btn btn-primary w-fit ml-auto mt-2" disabled={loading}>{loading ? "Saving Note..." : "Create Note"}</button>
              </form>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
