import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

export interface ConsultationFilterState {
  dateFrom: string;
  dateTo: string;
  daysToEnd: 'all' | 'urgent' | 'week' | 'month';
}

interface ConsultationsAdvancedFilterProps {
  onFilterChange: (filters: ConsultationFilterState) => void;
  onClose: () => void;
}

export default function ConsultationsAdvancedFilter({ 
  onFilterChange, 
  onClose 
}: ConsultationsAdvancedFilterProps) {
  const [filters, setFilters] = React.useState<ConsultationFilterState>({
    dateFrom: '',
    dateTo: '',
    daysToEnd: 'all',
  });

  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    const resetFilters: ConsultationFilterState = {
      dateFrom: '',
      dateTo: '',
      daysToEnd: 'all',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Zaawansowane filtry</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Filtr dat */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Termin zakończenia</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-2">Data od</label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-2">Data do</label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        {/* Pilność */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Pilność</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={filters.daysToEnd === 'all' ? 'default' : 'outline'}
              onClick={() => setFilters({ ...filters, daysToEnd: 'all' })}
              className="text-sm"
            >
              Wszystkie
            </Button>
            <Button
              variant={filters.daysToEnd === 'urgent' ? 'default' : 'outline'}
              onClick={() => setFilters({ ...filters, daysToEnd: 'urgent' })}
              className="text-sm"
            >
              Pilne (&lt; 7 dni)
            </Button>
            <Button
              variant={filters.daysToEnd === 'week' ? 'default' : 'outline'}
              onClick={() => setFilters({ ...filters, daysToEnd: 'week' })}
              className="text-sm"
            >
              Do 2 tygodni
            </Button>
            <Button
              variant={filters.daysToEnd === 'month' ? 'default' : 'outline'}
              onClick={() => setFilters({ ...filters, daysToEnd: 'month' })}
              className="text-sm"
            >
              Do miesiąca
            </Button>
          </div>
        </div>

        {/* Przyciski akcji */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            onClick={handleApply}
            className="flex-1 bg-[#394788] hover:bg-[#2a3560]"
          >
            Zastosuj filtry
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            Wyczyść wszystko
          </Button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
