import { Link } from "react-router-dom"
import { Plus } from "lucide-react"

export default function Navbar() {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
        <nav className="mx-auto max-w-7xl px-4 py-5 sm:py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl font-bold text-primary font-mono tracking-tight">NoteKeeper</h1>
                <Link to="/create" className="btn btn-primary btn-sm sm:btn-md flex justify-center items-center gap-0.5 size-8 rounded-full sm:size-auto">
                  <Plus className="size-5 shrink-0 sm:stroke-[3]" strokeWidth={2.5} />
                  <span className="hidden sm:inline text-lg tracking-wide">New</span>
                </Link>
            </div>
        </nav>
    </header>
  )
}