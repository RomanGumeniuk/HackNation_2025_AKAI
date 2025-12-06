'use client';

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Search } from 'lucide-react';
import ConsultationBox from '@/components/consultations/ConsultationBox';
import { LocationBanner } from '@/components/consultations/LocationBanner';
import { TypeFilterTabs } from '@/components/consultations/TypeFilterTabs';
import { LocalFilters } from '@/components/consultations/LocalFilters';
import { ConsultationTableRow } from '@/components/consultations/ConsultationTableRow';
import { ConsultationsPagination } from '@/components/consultations/ConsultationsPagination';
import { ITEMS_PER_PAGE, USER_CITY } from '@/components/consultations/constants';
import { consultationsData } from '@/mock_data/consultations';

export default function Konsultacje() {
  const [category, setCategory] = useState<'najpopularniejsze' | 'rejestr'>('najpopularniejsze');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<'krajowe' | 'samorządowe'>('krajowe');
  const [cityFilter, setCityFilter] = useState('');
  const [institutionTypeFilter, setInstitutionTypeFilter] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(false);

  const topPrekonsultacje = useMemo(() => {
    return consultationsData
      .filter(c => c.status === 'Prekonsultacje' && c.type === 'krajowe')
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3);
  }, []);

  const topRegional = useMemo(() => {
    return consultationsData
      .filter(c => c.type === 'samorządowe' && c.city === USER_CITY)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3);
  }, []);

  const cities = useMemo(() => {
    const citySet = new Set(
      consultationsData
        .filter(c => c.city)
        .map(c => c.city!)
    );
    return Array.from(citySet).sort();
  }, []);

  const filteredConsultations = useMemo(() => {
    if (typeFilter === 'samorządowe' && !cityFilter) {
      return [];
    }

    return consultationsData.filter((consultation) => {
      const matchesSearch = 
        consultation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.proposer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = consultation.type === typeFilter;
      
      const matchesCity = 
        typeFilter !== 'samorządowe' || 
        !cityFilter || 
        consultation.city?.toLowerCase() === cityFilter.toLowerCase();
      
      const matchesInstitutionType = 
        typeFilter !== 'samorządowe' ||
        institutionTypeFilter === 'all' || 
        consultation.institutionType === institutionTypeFilter;
      
      const matchesStatus = showCompleted || consultation.status !== 'Zakończone';
      
      return matchesSearch && matchesType && matchesCity && matchesInstitutionType && matchesStatus;
    });
  }, [searchQuery, typeFilter, cityFilter, institutionTypeFilter, showCompleted]);

  const totalPages = Math.ceil(filteredConsultations.length / ITEMS_PER_PAGE);
  const paginatedConsultations = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredConsultations.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredConsultations, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, cityFilter, institutionTypeFilter, showCompleted]);

  const handleTypeChange = (type: 'krajowe' | 'samorządowe') => {
    setTypeFilter(type);
    setCityFilter('');
    setInstitutionTypeFilter('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Nagłówek strony */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Partycypacja i Konsultacje Społeczne
          </h1>
        </div>

        {/* Wybór kategorii */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex justify-between items-end pb-4">
            <div className="flex gap-6">
              <button
                onClick={() => setCategory('najpopularniejsze')}
                className={`font-semibold text-sm transition-colors ${
                  category === 'najpopularniejsze'
                    ? 'text-black border-b-2 border-[#394788] pb-4 -mb-4'
                    : 'text-[#C1C1C1] hover:text-gray-800'
                }`}
              >
                Najpopularniejsze
              </button>
              <button
                onClick={() => setCategory('rejestr')}
                className={`font-semibold text-sm transition-colors ${
                  category === 'rejestr'
                    ? 'text-black border-b-2 border-[#394788] pb-4 -mb-4'
                    : 'text-[#C1C1C1] hover:text-gray-800'
                }`}
              >
                Rejestr Konsultacji
              </button>
            </div>

            {/* Filtry typu - widoczne tylko dla rejestru */}
            {category === 'rejestr' && (
              <div className="flex gap-4">
                <button
                  onClick={() => handleTypeChange('krajowe')}
                  className={`font-semibold text-sm transition-colors ${
                    typeFilter === 'krajowe'
                      ? 'text-black border-b-2 border-[#394788] pb-4 -mb-4'
                      : 'text-[#C1C1C1] hover:text-gray-800'
                  }`}
                >
                  Prawo Krajowe
                </button>
                <button
                  onClick={() => handleTypeChange('samorządowe')}
                  className={`font-semibold text-sm transition-colors ${
                    typeFilter === 'samorządowe'
                      ? 'text-black border-b-2 border-[#394788] pb-4 -mb-4'
                      : 'text-[#C1C1C1] hover:text-gray-800'
                  }`}
                >
                  Instytucje Samorządowe
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Banner lokalizacji */}
        {category === 'najpopularniejsze' && <LocationBanner city={USER_CITY} />}

        {/* Najpopularniejsze konsultacje */}
        {category === 'najpopularniejsze' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConsultationBox
              title="Prekonsultacje Sejmowe - Najpopularniejsze"
              consultations={topPrekonsultacje}
            />

            <ConsultationBox
              title="Konsultacje w Twoim Regionie - Najpopularniejsze"
              consultations={topRegional}
            />
          </div>
        )}

        {/* Rejestr konsultacji */}
        {category === 'rejestr' && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Nagłówek sekcji */}
          <div className="px-6 py-5 bg-linear-to-r from-[#394788]/5 to-transparent border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Rejestr Konsultacji</h2>
          </div>

          {/* Filtry i wyszukiwanie */}
          <div className="p-6 border-b border-gray-200">
            {/* Wyszukiwarka z ikoną */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Wyszukaj konsultacje po tytule, opisie lub wnioskodawcy..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-300 focus:border-[#394788] focus:ring-[#394788]"
                />
              </div>
            </div>

            {/* Switch zakończonych konsultacji */}
            <div className="mb-6 flex items-center justify-between p-4 bg-gray-50/50 rounded-lg border border-gray-200">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">Zakończone konsultacje</span>
                <span className="text-xs text-gray-500">Pokaż również konsultacje, które się zakończyły</span>
              </div>
              <Switch
                checked={showCompleted}
                onCheckedChange={setShowCompleted}
              />
            </div>

            {/* Komunikat dla konsultacji samorządowych */}
            {typeFilter === 'samorządowe' && !cityFilter && (
              <div className="mb-4 p-4 bg-orange-50/50 border border-orange-100 rounded-lg text-orange-900 text-sm">
                <strong>Wskazówka:</strong> Wybierz miasto poniżej, aby wyświetlić dostępne konsultacje samorządowe
              </div>
            )}

            {/* Filtry lokalne dla samorządowych */}
            {typeFilter === 'samorządowe' && (
              <LocalFilters
                cityFilter={cityFilter}
                setCityFilter={setCityFilter}
                institutionTypeFilter={institutionTypeFilter}
                setInstitutionTypeFilter={setInstitutionTypeFilter}
                cities={cities}
              />
            )}
          </div>

          {/* Tabela konsultacji */}
          <div>
            {filteredConsultations.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-gray-50 border-b border-gray-200">
                      <TableHead className="font-bold text-gray-900">Tytuł</TableHead>
                      <TableHead className="font-bold text-gray-900">Wnioskodawca</TableHead>
                      <TableHead className="font-bold text-gray-900">Termin</TableHead>
                      <TableHead className="font-bold text-gray-900">Status</TableHead>
                      <TableHead className="font-bold text-gray-900">Tagi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedConsultations.map((consultation) => (
                      <ConsultationTableRow key={consultation.id} consultation={consultation} />
                    ))}
                  </TableBody>
                </Table>

                <ConsultationsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500 text-sm">
                  {typeFilter === 'samorządowe' && !cityFilter
                    ? 'Wybierz miasto z filtrów powyżej, aby wyświetlić konsultacje samorządowe'
                    : 'Brak wyników dla podanych kryteriów wyszukiwania'}
                </p>
              </div>
            )}
          </div>

          {/* Info o wynikach */}
          {filteredConsultations.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
              <div className="flex justify-between items-center text-xs text-gray-600">
                <div>
                  Znaleziono <span className="font-semibold text-gray-900">{filteredConsultations.length}</span>{' '}
                  <span>konsultacji · Strona {currentPage} z {totalPages}</span>
                </div>
                <div className="text-gray-500 italic">
                  Dane aktualizowane co godzinę
                </div>
              </div>
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  );
}
