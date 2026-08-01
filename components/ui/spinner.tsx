import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

type SpinnerProps = React.ComponentProps<"svg"> & {"aria-label": string}

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2Icon data-slot="spinner" role="status" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
