
'use client';

import React, { useState } from 'react';
import { Filter, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
} from '@/app/ustawy/Components/table';
import { lawsData } from '@/mock_data/laws';

export default function Ustawy() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('ustawy');
  const [showTags, setShowTags] = useState(false);
  const itemsPerPage = 10;

  const filteredLaws = lawsData.filter((ustawy: any) => {
    const matchesSearch = ustawy.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = ustawy.category === category;
    const matchesTags = selectedTags.length === 0 || ustawy.tags.some((tag: any) => selectedTags.includes(tag.name));
    
    return matchesSearch && matchesCategory && matchesTags;
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
          <div className="flex gap-4">
            <button
              onClick={() => setCategory('ustawy')}
              className={`pb-4 px-4 font-semibold text-sm transition-colors ${
                category === 'ustawy'
                  ? 'text-indigo-700 border-b-2 border-indigo-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Ustawy
            </button>
            <button
              onClick={() => setCategory('rozporzadzenia')}
              className={`pb-4 px-4 font-semibold text-sm transition-colors ${
                category === 'rozporzadzenia'
                  ? 'text-indigo-700 border-b-2 border-indigo-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Rozporządzenia
            </button>
            <button
              onClick={() => setCategory('inne')}
              className={`pb-4 px-4 font-semibold text-sm transition-colors ${
                category === 'inne'
                  ? 'text-indigo-700 border-b-2 border-indigo-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Inne Akty
            </button>
          </div>
        </div>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <div className="flex gap-4 mb-6">
            <Input
              type="text"
              placeholder="Wyszukiwarka ustaw"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-gray-200"
            />
            <Button className="rounded-full bg-indigo-700 text-white hover:bg-indigo-800 px-6">
              Szukaj!
            </Button>
            <Button variant="outline" size="icon" className="rounded-lg" onClick={() => setShowTags(!showTags)}>
              <Filter size={20} />
            </Button>
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
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Sugestie:</p>
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
          {filteredLaws.length > 0 ? (
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
                          className=" text-decoration-line:none  hover:text-indigo-900 hover:underline "
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

        {filteredLaws.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            Znaleziono <span className="font-semibold">{filteredLaws.length}</span> ustaw (Strona {currentPage} z {totalPages})
          </div>
        )}
      </div>
        
    </div>
  );
}
