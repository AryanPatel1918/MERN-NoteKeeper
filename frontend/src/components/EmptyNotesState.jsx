import { Notebook } from 'lucide-react'

export default function EmptyNotesState() {
  return (
    <div className="flex flex-col items-center mt-16 sm:mt-20 md:mt-28">
      <Notebook className="text-gray-400 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4" strokeWidth={1.5} />
      <h2 className="text-lg sm:text-xl font-semibold text-gray-500">No notes yet</h2>
    </div>
  )
}
