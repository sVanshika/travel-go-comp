import { Plane } from "lucide-react"

export function Logo({ className = "", size = "default" }) {
  const sizeClasses = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-3xl",
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Plane className={`text-primary ${size === "small" ? "h-5 w-5" : size === "large" ? "h-7 w-7" : "h-6 w-6"}`} />
      <span className={`font-bold ${sizeClasses[size] || sizeClasses.default}`}>TravelGo</span>
    </div>
  )
}
