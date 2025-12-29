import { Link } from "react-router"
import { SquarePen, Trash2 } from 'lucide-react'

export default function NoteCard({ note }) {
  return (
    <Link to={`/notes/${note._id}`} className="card bg-base-300 shadow-md hover:shadow-[#00FF9D] transition-all duration-200 border-t-4 border-[#00FF9D]">
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/80 line-clamp-3">{note.content}</p>
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
            <div className="hover:bg-slate-800 p-1.5 rounded-full">
              <SquarePen className="size-5 text-base-content" />
            </div>
            <div className="hover:bg-slate-800 p-1.5 rounded-full">
              <Trash2 className="size-5 text-red-500" />
            </div>  
          </div>
        </div>
      </div>
    </Link>
  )
}
