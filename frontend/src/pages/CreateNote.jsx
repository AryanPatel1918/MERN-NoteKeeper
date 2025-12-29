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
      if (error.response) {
        console.log(error.response)
        toast.error(`Error ${error.response.status}: ${error.response.data?.error || "Server error"}`)
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
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <label className="label">
                  <span className="font-medium text-lg">Title</span>
                </label>
                <input className="input input-bordered focus:outline-0" value={title} onChange={e => setTitle(e.target.value)} placeholder="Grocery List" />
                <label className="label">
                  <span className="font-medium text-lg">Content</span>
                </label>
                <textarea className="input input-bordered focus:outline-0 w-full h-full p-4" rows={5} value={content} onChange={e => setContent(e.target.value)} placeholder="Apples, bread, cheese, french fries" />

                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-primary" disabled={loading}>{loading ? "Saving Note..." : "Create Note"}</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
