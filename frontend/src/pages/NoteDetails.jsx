import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { toast } from 'react-hot-toast'
import LoadingOverlay from "../components/LoadingOverlay"
import BackButton from "../components/BackButton"

export default function NoteDetails() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isFetching, setIsFetching] = useState(true)
  
  const { id } = useParams()

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


  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <BackButton />

          {isFetching && <LoadingOverlay />}
          <div className={`card bg-[hsl(0_0_12%)] transition-opacity duration-500 ${isFetching ? "opacity-0" : "opacity-100"}`}>
            <div className="card-body p-4 sm:p-7">
              <div>
                <h1 className="text-xl sm:text-2xl font-medium break-all mb-4">{title}</h1>
                <p className="text-base sm:text-lg overflow-y-auto text-base-content/90 whitespace-pre-wrap leading-relaxed break-all">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
