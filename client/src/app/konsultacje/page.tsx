'use client';

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ConsultationBox from '@/components/consultations/ConsultationBox';
import { LocationBanner } from '@/components/consultations/LocationBanner';
import { TypeFilterTabs } from '@/components/consultations/TypeFilterTabs';
import { LocalFilters } from '@/components/consultations/LocalFilters';
import { ConsultationTableRow } from '@/components/consultations/ConsultationTableRow';
import { ConsultationsPagination } from '@/components/consultations/ConsultationsPagination';
import { ITEMS_PER_PAGE, USER_CITY } from '@/components/consultations/constants';
import { consultationsData } from '@/mock_data/consultations';

export default function Konsultacje() {
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
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Partycypacja i Konsultacje Społeczne
          </h1>
          <p className="text-base text-gray-600">
            Narzędzia umożliwiające aktywny udział obywateli w procesie stanowienia prawa
          </p>
        </div>

        <LocationBanner city={USER_CITY} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ConsultationBox
            title="Prekonsultacje Sejmowe - Najpopularniejsze"
            consultations={topPrekonsultacje}
          />

          <ConsultationBox
            title="Konsultacje w Twoim Regionie - Najpopularniejsze"
            consultations={topRegional}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">Rejestr Konsultacji</h2>
          </div>

          <div className="mb-6">
            <Input
              type="text"
              placeholder="Wyszukaj konsultacje..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-200"
            />
          </div>

          <div className="mb-6">
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCompleted}
                  onChange={(e) => setShowCompleted(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                Pokaż zakończone konsultacje
              </label>
            </div>

            <TypeFilterTabs 
              typeFilter={typeFilter} 
              onTypeChange={handleTypeChange}
            />

            {typeFilter === 'samorządowe' && !cityFilter && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
                <strong>Wybierz miasto</strong>, aby wyświetlić konsultacje samorządowe
              </div>
            )}

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

          <div className="rounded overflow-hidden border border-gray-200">
            {filteredConsultations.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-gray-50">
                      <TableHead className="font-bold">Tytuł</TableHead>
                      <TableHead className="font-bold">Wnioskodawca</TableHead>
                      <TableHead className="font-bold">Termin</TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="font-bold">Tagi</TableHead>
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
                <p className="text-gray-500">
                  {typeFilter === 'samorządowe' && !cityFilter
                    ? 'Wybierz miasto z filtrów powyżej, aby wyświetlić konsultacje samorządowe'
                    : 'Brak wyników dla podanych kryteriów wyszukiwania'}
                </p>
              </div>
            )}
          </div>

          {filteredConsultations.length > 0 && (
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
              <div>
                Znaleziono <span className="font-semibold">{filteredConsultations.length}</span>{' '}
                konsultacji (Strona {currentPage} z {totalPages})
              </div>
              <div className="text-xs text-gray-500 italic">
                Dane odświeżane co godzinę
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
