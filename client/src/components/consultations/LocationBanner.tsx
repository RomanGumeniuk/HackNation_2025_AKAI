import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

export function LocationBanner({ city }: { city: string }) {
  return (
    <div className="mb-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#394788]/10 flex items-center justify-center">
            <MapPin size={20} className="text-[#394788]" />
          </div>
          <div className="text-sm">
            <p className="text-gray-600">Twoja lokalizacja:</p>
            <p className="font-semibold text-gray-900">{city}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="text-[#394788] border-[#394788] hover:bg-[#394788]/5 hover:border-[#394788]"
        >
          Zmień
        </Button>
      </div>
    </div>
  );
}
