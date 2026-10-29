import { FileQuestion } from 'lucide-react'

export default function BackendErrorState() {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="bg-warning/20 border border-warning rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-warning/20 border border-warning p-3 sm:p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <FileQuestion className="size-8 sm:size-10 text-error" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="sm:text-xl font-bold mb-2">Note not found</h3>
            <p className="text-sm sm:text-base text-base-content mb-1">The note you’re looking for doesn’t exist or may have been deleted.</p>
          </div>
        </div>
      </div>
    </div>
  )
}