import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function BackButton() {
  return (
    <Link to="/" className="btn btn-ghost px-3 sm:px-4">
      <ArrowLeft className="size-4 sm:size-5" />
      <span className="text-sm sm:text-base">Back</span>
    </Link>
  )
}