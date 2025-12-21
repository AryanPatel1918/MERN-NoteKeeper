import { Link } from "react-router"

export default function NoteCard({ note }) {
  return (
    <Link to={`/notes/${note._id}`} className="card border-t-2 border-primary shadow-2xl rounded-lg p-3">
      {note._id}
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>
        {new Date(note.updatedAt).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        })}
      </p>
    </Link>
  )
}
