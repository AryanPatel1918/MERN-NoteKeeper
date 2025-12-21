import { Link } from "react-router"
import { Plus } from "lucide-react"

export default function Navbar() {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
        <nav className="mx-auto max-w-7xl p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">NoteKeeper</h1>
                <Link to="/create" className="btn btn-primary text-base-300 flex items-center gap-1">
                  <Plus className="size-5" />
                  <span className="text-base tracking-wide">New</span>
                </Link>
            </div>
        </nav>
    </header>
  )
}
