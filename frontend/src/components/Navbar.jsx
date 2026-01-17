import { Link } from "react-router-dom"
import { Plus } from "lucide-react"

export default function Navbar() {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
        <nav className="mx-auto max-w-7xl p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary font-mono tracking-tight">NoteKeeper</h1>
                <Link to="/create" className="btn btn-primary btn-sm sm:btn-md text-base-300 flex items-center gap-0.5 sm:gap-1">
                  <Plus className="size-4 sm:size-5" strokeWidth={2.5} />
                  <span className="text-base sm:text-lg sm:tracking-wide">New</span>
                </Link>
            </div>
        </nav>
    </header>
  )
}
