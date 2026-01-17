export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="animate-ping w-10 h-10 rounded-full bg-primary"></div>
    </div>
  )
}
