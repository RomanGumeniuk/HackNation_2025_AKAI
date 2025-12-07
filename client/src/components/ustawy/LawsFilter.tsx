'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  CalendarIcon, 
  Info, 
  Globe,
  Scale,
  BookOpen,
  AlertCircle,
  FileText,
  Building2,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface LawsFilterProps {
  onFilterChange: (filters: FilterState) => void;
  onClose?: () => void;
}

const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="relative inline-block group">
      {children}
      <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
        {text}
      </div>
    </div>
  );
};

export interface FilterState {
  dateFrom: string;
  dateTo: string;
  progress: string;
  applicant: string;
  legislativeNumber: string;
  checkboxes: {
    euLaw: boolean;
    constitutionalCourt: boolean;
    lawBased: boolean;
    separateProcess: boolean;
    journalPublished: boolean;
    sejm: boolean;
  };
}

export default function LawsFilter({ onFilterChange, onClose }: LawsFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    dateFrom: '',
    dateTo: '',
    progress: 'dowolny',
    applicant: 'dowolny',
    legislativeNumber: '',
    checkboxes: {
      euLaw: false,
      constitutionalCourt: false,
      lawBased: false,
      separateProcess: false,
      journalPublished: false,
      sejm: false,
    },
  });

  const [dateFromOpen, setDateFromOpen] = useState(false);
  const [dateToOpen, setDateToOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleDateChange = (field: 'dateFrom' | 'dateTo', date: Date | undefined) => {
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      handleInputChange(field, dateString);
    }
  };

  const handleCheckboxChange = (checkbox: keyof FilterState['checkboxes']) => {
    const updatedFilters = {
      ...filters,
      checkboxes: {
        ...filters.checkboxes,
        [checkbox]: !filters.checkboxes[checkbox],
      },
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleClear = () => {
    const clearedFilters: FilterState = {
      dateFrom: '',
      dateTo: '',
      progress: 'dowolny',
      applicant: 'dowolny',
      legislativeNumber: '',
      checkboxes: {
        euLaw: false,
        constitutionalCourt: false,
        lawBased: false,
        separateProcess: false,
        journalPublished: false,
        sejm: false,
      },
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const checkboxItems = [
    {
      id: 'euLaw',
      label: 'Projekt realizuje przepisy prawa Unii Europejskiej',
      icon: Globe,
    },
    {
      id: 'constitutionalCourt',
      label: 'Projekt wykonuje orzeczenie Trybunału Konstytucyjnego',
      icon: Scale,
    },
    {
      id: 'lawBased',
      label: 'Projekt opracowany na podstawie założeń projektu ustaw',
      icon: BookOpen,
    },
    {
      id: 'separateProcess',
      label: 'Projekt opracowany w trybie odrębnym',
      icon: AlertCircle,
    },
    {
      id: 'journalPublished',
      label: 'Ogłoszono w Dzienniku Ustaw',
      icon: FileText,
    },
    {
      id: 'sejm',
      label: 'Skierowanie do prac w Sejmie RP',
      icon: Building2,
    },
  ];

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-md">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">Zaawansowane filtry</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <div className="flex items-center gap-1 mb-2">
            <label className="block text-xs font-semibold text-gray-700">
              Data utworzenia (od - do)
            </label>
            <Tooltip text="Filtruj projekty ustaw po dacie ich utworzenia">
              <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <Popover open={dateFromOpen} onOpenChange={setDateFromOpen}>
              <PopoverTrigger asChild>
                <button className="flex-1 flex items-center gap-2 px-3 py-2 text-xs rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                  <CalendarIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    {filters.dateFrom
                      ? format(new Date(filters.dateFrom), 'dd.MM.yyyy', {
                          locale: pl,
                        })
                      : 'Od'}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    filters.dateFrom ? new Date(filters.dateFrom) : undefined
                  }
                  onSelect={(date) => {
                    handleDateChange('dateFrom', date);
                    setDateFromOpen(false);
                  }}
                  disabled={(date) =>
                    filters.dateTo
                      ? date > new Date(filters.dateTo)
                      : false
                  }
                  locale={pl}
                  className="text-xs"
                />
              </PopoverContent>
            </Popover>

            <span className="text-gray-400 font-medium text-xs">-</span>

            <Popover open={dateToOpen} onOpenChange={setDateToOpen}>
              <PopoverTrigger asChild>
                <button className="flex-1 flex items-center gap-2 px-3 py-2 text-xs rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                  <CalendarIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    {filters.dateTo
                      ? format(new Date(filters.dateTo), 'dd.MM.yyyy', {
                          locale: pl,
                        })
                      : 'Do'}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.dateTo ? new Date(filters.dateTo) : undefined}
                  onSelect={(date) => {
                    handleDateChange('dateTo', date);
                    setDateToOpen(false);
                  }}
                  disabled={(date) =>
                    filters.dateFrom
                      ? date < new Date(filters.dateFrom)
                      : false
                  }
                  locale={pl}
                  className="text-xs"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <label className="block text-xs font-semibold text-gray-700">
                Postęp prac
              </label>
              <Tooltip text="Etap zaawansowania projektu ustawy">
                <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
              </Tooltip>
            </div>
            <select
              value={filters.progress}
              onChange={(e) => handleInputChange('progress', e.target.value)}
              className="w-full px-2 py-1.5 rounded-md border border-gray-300 bg-white text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[#394788] focus:border-transparent transition-all"
            >
              <option value="dowolny">Dowolny</option>
              <option value="etap1">Etap 1</option>
              <option value="etap2">Etap 2</option>
              <option value="etap3">Etap 3</option>
              <option value="zakonczone">Zakończone</option>
            </select>
          </div>

          <div>
            <div className="flex items-center gap-1 mb-1">
              <label className="block text-xs font-semibold text-gray-700">
                Wnioskodawca
              </label>
              <Tooltip text="Jednostka, która wnioskuje o nowelizację ustawy">
                <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
              </Tooltip>
            </div>
            <select
              value={filters.applicant}
              onChange={(e) => handleInputChange('applicant', e.target.value)}
              className="w-full px-2 py-1.5 rounded-md border-2 border-[#394788] bg-white text-gray-900 text-xs focus:outline-none focus:ring-1 focus:ring-[#394788] focus:border-[#394788] transition-all"
            >
              <option value="dowolny">Dowolny</option>
              <option value="sejm">Sejm RP</option>
              <option value="senat">Senat RP</option>
              <option value="prezydent">Prezydent RP</option>
              <option value="rzad">Rząd RP</option>
              <option value="inne">Inne</option>
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1 mb-1">
            <label className="block text-xs font-semibold text-gray-700">
              Numer z wykazu
            </label>
            <Tooltip text="Unikalny numer projektu z wykazu prac legislacyjnych">
              <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <Input
            type="text"
            placeholder="Np. PLS-2024-001"
            value={filters.legislativeNumber}
            onChange={(e) =>
              handleInputChange('legislativeNumber', e.target.value)
            }
            className="w-full h-8 px-2 bg-gray-50 border-gray-300 text-xs"
          />
        </div>

        <div>
          <div className="flex items-center gap-1 mb-3">
            <p className="text-xs font-semibold text-gray-700">
              Kryteria dodatkowe:
            </p>
            <Tooltip text="Dodatkowe warunki spełniane przez projekt ustawy">
              <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
            </Tooltip>
          </div>
          <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-md">
            {checkboxItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <label
                  key={item.id}
                  className="flex items-start gap-2 p-2 rounded hover:bg-white cursor-pointer transition-colors border border-transparent hover:border-gray-300"
                >
                  <input
                    type="checkbox"
                    checked={
                      filters.checkboxes[
                        item.id as keyof FilterState['checkboxes']
                      ]
                    }
                    onChange={() =>
                      handleCheckboxChange(
                        item.id as keyof FilterState['checkboxes']
                      )
                    }
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#394788] focus:ring-[#394788] cursor-pointer shrink-0"
                  />
                  <IconComponent className="w-4 h-4 mt-0.5 text-[#394788] shrink-0" />
                  <span className="text-xs text-gray-700 leading-snug flex-1">
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClear}
            className="text-[#394788] font-medium text-xs hover:underline hover:text-[#2a3560] transition-colors"
          >
            Wyczyść
          </button>
          <Button
            type="button"
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-1.5 h-auto rounded-md text-xs font-medium"
          >
            Szukaj
          </Button>
        </div>
      </form>
    </div>
  );
}
