import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function BackButton() {
  return (
    <Link to="/" className="btn btn-ghost">
      <ArrowLeft className="size-5" />
      <span className="text-base">Back</span>
    </Link>
  )
}
