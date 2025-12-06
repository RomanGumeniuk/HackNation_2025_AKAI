

'use client';

import React, { useState } from 'react';
import { Filter, Bookmark,X,Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import LawsFilter, { FilterState } from '@/components/ustawy/LawsFilter';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { lawsData } from '@/mock_data/laws';

export default function Ustawy() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [superCategory, setSuperCategory] = useState<'prawo_krajowe' | 'instytucje_lokalne' | null>('prawo_krajowe');
  const [category, setCategory] = useState<'ustawy' | 'rozporzadzenia' | 'inne' | null>('ustawy');
  const [showTags, setShowTags] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
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
  const itemsPerPage = 10;

  const handleFilterChange = (filters: FilterState) => {
    setAdvancedFilters(filters);
    setCurrentPage(1);
  };

  const filteredLaws = lawsData.filter((ustawy: any) => {
    const matchesSearch = ustawy.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSuperCategory = !superCategory || ustawy.superCategory === superCategory;
    const matchesCategory = !category || ustawy.category === category;
    const matchesTags = selectedTags.length === 0 || ustawy.tags.some((tag: any) => selectedTags.includes(tag.name));
    
    // Advanced filter matching
    const matchesDateFrom = !advancedFilters.dateFrom || new Date(ustawy.createdDate) >= new Date(advancedFilters.dateFrom);
    const matchesDateTo = !advancedFilters.dateTo || new Date(ustawy.createdDate) <= new Date(advancedFilters.dateTo);
    const matchesProgress = advancedFilters.progress === 'dowolny' || ustawy.stage.toLowerCase().includes(advancedFilters.progress);
    const matchesApplicant = advancedFilters.applicant === 'dowolny' || ustawy.applicant.toLowerCase().includes(advancedFilters.applicant);
    const matchesLegislativeNumber = !advancedFilters.legislativeNumber || ustawy.legislativeNumber.toLowerCase().includes(advancedFilters.legislativeNumber.toLowerCase());
    
    // Checkbox filters
    const matchesCheckboxes = 
      (!advancedFilters.checkboxes.euLaw || ustawy.euLaw) &&
      (!advancedFilters.checkboxes.constitutionalCourt || ustawy.constitutionalCourt) &&
      (!advancedFilters.checkboxes.lawBased || ustawy.lawBased) &&
      (!advancedFilters.checkboxes.separateProcess || ustawy.separateProcess) &&
      (!advancedFilters.checkboxes.journalPublished || ustawy.journalPublished) &&
      (!advancedFilters.checkboxes.sejm || ustawy.sejm);
    
    return matchesSearch && matchesSuperCategory && matchesCategory && matchesTags && 
           matchesDateFrom && matchesDateTo && matchesProgress && matchesApplicant && 
           matchesLegislativeNumber && matchesCheckboxes;
  });

  const totalPages = Math.ceil(filteredLaws.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLaws = filteredLaws.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags]);

  const allTags = Array.from(new Set(lawsData.flatMap((ustawy: any) => ustawy.tags.map((t: any) => t.name)))) as string[];

  const filteredTagsForDisplay = allTags.filter(tag => 
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
       

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 border-b border-gray-200">
          <div className="flex justify-between items-end pb-4 gap-8">
            <div>
              <p className={`text-xs font-semibold mb-3 uppercase tracking-wide ${
                superCategory ? 'text-gray-700' : 'text-[#C1C1C1]'
              }`}>Kategoria</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setSuperCategory('prawo_krajowe')}
                  className={`pb-4 px-4 font-semibold text-sm transition-colors ${
                    superCategory === 'prawo_krajowe'
                      ? 'text-black border-b-2 border-[#394788] '
                      : 'text-[#C1C1C1] cursor-pointer hover:text-black'
                  }`}
                >  
                  Prawo Krajowe
                </button>
                <button
                  onClick={() => setSuperCategory('instytucje_lokalne')}
                  className={`pb-4 px-4 font-semibold text-sm transition-colors ${
                    superCategory === 'instytucje_lokalne'
                      ? 'text-black border-b-2 border-[#394788]'
                      : 'text-[#C1C1C1] cursor-pointer hover:text-black'
                  }`}
                >
                  Instytucje Lokalne
                </button>
              </div>
            </div>

            {superCategory && (
              <div>
                <p className={`text-xs font-semibold mb-3 uppercase tracking-wide ${
                  category ? 'text-gray-700' : 'text-[#C1C1C1]'
                }`}>Rodzaj aktu</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCategory('ustawy')}
                    className={`pb-4 px-4 font-semibold text-sm transition-colors ${
                      category === 'ustawy'
                        ? 'text-black border-b-2 border-[#394788]'
                        : 'text-[#C1C1C1] cursor-pointer hover:text-black'
                    }`}
                  >
                    Ustawy
                  </button>
                  <button
                    onClick={() => setCategory('rozporzadzenia')}
                    className={`pb-4 px-4 font-semibold text-sm transition-colors ${
                      category === 'rozporzadzenia'
                        ? 'text-black border-b-2 border-[#394788]'
                        : 'text-[#C1C1C1] cursor-pointer hover:text-black'
                    }`}
                  >
                    Rozporządzenia
                  </button>
                  <button
                    onClick={() => setCategory('inne')}
                    className={`pb-4 px-4 font-semibold text-sm transition-colors ${
                      category === 'inne'
                        ? 'text-black border-b-2 border-[#394788]'
                        : 'text-[#C1C1C1] cursor-pointer hover:text-black'
                    }`}
                  >
                    Inne Akty
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        

        {showAdvancedFilter && (
          <div className="mb-8">
            <LawsFilter onFilterChange={handleFilterChange} />
          </div>
        )}

        <div className="mb-1 rounded-lg bg-white p-6 shadow-md">
          <div className="flex gap-4 mb-2">
            <Input
              type="text"
              placeholder="Wyszukiwarka ustaw"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-gray-200"
            />
            <Button className="rounded-full cursor-pointer bg-[#394788] text-white hover:bg-[#2a3560] px-6">
              Szukaj!
            </Button>
            <Button variant="outline" size="icon" className="cursor-pointer rounded-lg" onClick={() => setShowTags(!showTags)}>
              <Tag size={20} />
            </Button>
            <div className="mb-1 flex justify-end">
          <Button 
            onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
            variant="outline"
            className="flex items-center gap-2 border-[#394788] text-[#394788] cursor-pointer hover:bg-[#394788] hover:text-white"
          >
            <Filter  size={18} />
            {showAdvancedFilter ? <X className="w-5 h-5" /> : 'Zaawansowany filtr'}
          </Button>
        </div>
          </div>
          {showTags && (
            <>
              <div className="flex gap-2 mb-6 w-1/2">
                <Input
                  type="text"
                  placeholder="Wyszukaj tagi"
                  value={tagSearchQuery}
                  onChange={(e) => setTagSearchQuery(e.target.value)}
                  className="flex-1 bg-gray-200 text-sm"
                />
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setTagSearchQuery('');
                    setSelectedTags([]);
                  }}
                  className="rounded-lg"
                >
                  Wyczyść
                </Button>
              </div>
              {tagSearchQuery.length > 0 && (
                <div className="mb-4 p-3 bg-[#FFFFFF] rounded-lg border border-gray-200">
                  <p className="text-sm text-black mb-2">Sugestie:</p>
                  <div className="flex flex-wrap gap-2">
                    {filteredTagsForDisplay.slice(0, 5).map((tag: string) => (
                      <Button
                        key={tag}
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedTags([...selectedTags, tag]);
                          setTagSearchQuery('');
                        }}
                        className="rounded-full"
                      >
                        + {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {filteredTagsForDisplay.map((tag: string) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    setSelectedTags(selectedTags.filter((t) => t !== tag));
                  } else {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}
                className="rounded-full"
              >
                {tag}
              </Button>
            ))}
          </div>
            </>
          )}
        </div>

        <div className="rounded-lg bg-white shadow-md overflow-hidden">
          {!superCategory ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">Wybierz kategorię aby zobaczyć akty prawne</p>
            </div>
          ) : filteredLaws.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Nazwa</TableHead>
                    <TableHead>Ostatnia Aktualizacja</TableHead>
                    <TableHead>Tagi</TableHead>
                    <TableHead>Etap</TableHead>
                    <TableHead className="text-center">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLaws.map((ustawy) => (
                    <TableRow key={ustawy.id}>
                      <TableCell>
                        <a
                          href={`/ustawy/${ustawy.id}`}
                          className="text-black hover:text-[#394788] hover:underline"
                        >
                          {ustawy.name}
                        </a>
                      </TableCell>
                      <TableCell>{ustawy.lastUpdate}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {ustawy.tags.map((tag: any) => (
                            <Badge key={tag.name} variant={tag.variant}>
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{ustawy.stage}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon">
                          <Bookmark size={20} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="px-6 py-4 border-t">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === currentPage}
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        href="#"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">Brak wyników dla wyszukiwania "{searchQuery}"</p>
            </div>
          )}
        </div>

        {superCategory && filteredLaws.length > 0 && (
          <div className="mt-4 text-sm text-black">
            Znaleziono <span className="font-semibold">{filteredLaws.length}</span> aktów (Strona {currentPage} z {totalPages})
          </div>
        )}
      </div>
        
    </div>
  );
}
