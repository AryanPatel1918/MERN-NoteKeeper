import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import { toast } from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import BackendErrorState from '../components/BackendErrorState'
import LoadingOverlay from '../components/LoadingOverlay'

export default function Home() {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:5000/api/notes')
      .then(res => {
        setNotes(res.data)
        setIsRateLimited(false)
      })
      .catch(error => {
        if (error.response?.status === 429) {
          setIsRateLimited(true)
        } else {
          // toast.error("Failed to load notes")
          setError(true)
          console.log(error)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar />
      
      {isRateLimited ? (
        <RateLimitedUI />
      ) : loading ? (
        <LoadingOverlay />
      ) : error ? (
          <BackendErrorState />
      ) : notes.length === 0 ? (
          <div className="mt-8 sm:mt-14 text-center sm:text-lg text-base-content/70 py-10">
            No notes yet. Create your first one!
          </div>
      ) : (
        <div className='max-w-7xl mx-auto p-4 mt-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4'>
              {notes.map(note => (
                <NoteCard key={note._id} note={note} onDelete={(id) => setNotes(prev => prev.filter(note => note._id !== id))} />
              ))}
            </div>
        </div>
      )}
    </div>
  )
}
