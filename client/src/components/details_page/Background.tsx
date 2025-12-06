import {PropsWithChildren} from "react"

export default function Background({children}: PropsWithChildren) {
  return (
    <div className="bg-[#F5F5F5] rounded-2xl border border-gray-300 shadow-sm p-6 w-full max-w-4xl mx-auto">
        {children}
    </div>
  )
}
