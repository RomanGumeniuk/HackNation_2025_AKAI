import LegislativeProcessGraph from '@/components/education/LegislativeProcessGraph'

export default function EdukacjaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen flex flex-col p-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-[#394788] mb-2">
            Proces Legislacyjny w Polsce
          </h1>
          <p className="text-sm text-gray-600">
            Kliknij na dowolny węzeł, aby wyświetlić szczegółowe informacje i zapytać asystenta AI
          </p>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
          <LegislativeProcessGraph />
        </div>
      </div>
    </div>
  )
}
