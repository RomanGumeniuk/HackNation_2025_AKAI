import { Button } from '@/components/ui/button';

export function LocationBanner({ city }: { city: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded text-sm">
        <div className="text-blue-800">
          Na podstawie Twojej lokalizacji pokazujemy konsultacje dla: <strong>{city}</strong>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="text-blue-700 border-blue-300 hover:bg-blue-100"
        >
          Zmień lokalizację
        </Button>
      </div>
    </div>
  );
}
