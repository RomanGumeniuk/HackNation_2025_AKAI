import {PropsWithChildren} from "react"

export default function Background({children}: PropsWithChildren) {
  return (
    <div className="bg-[#F5F5F5] rounded-2xl border border-gray-300 shadow-sm p-6 w-full max-w-4xl mx-auto">
        <div className="mb-4 pb-3 border-b border-gray-300">
          <p className="text-sm font-semibold text-[#394788]">
            Podsumowanie wygenerowane przez AI
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Poniższy tekst został automatycznie wygenerowany na podstawie treści dokumentu
          </p>
        </div>
        {children}
    </div>
  )
}
