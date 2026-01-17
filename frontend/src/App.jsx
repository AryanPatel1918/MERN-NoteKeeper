import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NoteDetails from "./pages/NoteDetails"
import CreateNote from "./pages/CreateNote"
import EditNote from "./pages/EditNote"
import toast from "react-hot-toast"

export default function App() {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes/:id' element={<NoteDetails />} />
        <Route path='/create' element={<CreateNote />} />
        <Route path='/edit/:id' element={<EditNote />} />
      </Routes>
    </div>
  )
}
