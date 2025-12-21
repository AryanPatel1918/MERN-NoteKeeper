import { ZapIcon } from "lucide-react"

export default function RateLimitedUI() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-primary/20 border border-primary rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ZapIcon className="size-10 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Rate Limit Exceeded</h3>
            <p className="text-base-content mb-1">You've made too many requests in a short period. Please wait a few seconds before trying again.</p>
            <p className="text-sm text-base-content/70">This ensures the best experience.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
