import { ServerOff } from 'lucide-react'

export default function BackendErrorState() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-error/20 border border-error rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-error/20 border border-error p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ServerOff className="size-10 text-error" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Server not available</h3>
            <p className="text-base-content mb-1">We couldn’t connect to the server right now.</p>
            <p className="text-base-content/70">Make sure the backend is running, then refresh the page.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
