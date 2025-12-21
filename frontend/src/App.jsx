import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import NoteDetails from "./pages/NoteDetails"
import CreateNote from "./pages/CreateNote"
import toast from "react-hot-toast"

export default function App() {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateNote />} />
        <Route path='/notes/:id' element={<NoteDetails />} />
      </Routes>
    </div>
  )
}
