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
} from '@/components/ui/table';
import { lawsData } from '@/mock_data/laws';

export default function Ustawy() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredLaws = lawsData.filter((law: any) => {
    const matchesSearch = law.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || law.tags.some((tag: any) => selectedTags.includes(tag.name));
    
    return matchesSearch && matchesTags;
  });

  const totalPages = Math.ceil(filteredLaws.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLaws = filteredLaws.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags]);

  const allTags = Array.from(new Set(lawsData.flatMap((law: any) => law.tags.map((t: any) => t.name)))) as string[];

  return (
    <div className="min-h-screen bg-gray-50">
      
        <div className="mx-auto max-w-6xl px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-800">Wyszukiwarka ustaw</h1>
          <Link
            href="/"
            className="mt-2 inline-block text-sm text-gray-600 hover:text-gray-800 underline"
          >
            ← wróć do poprzedniej strony
          </Link>
        </div>
      
      <Separator className='pt-0.5'></Separator>

      <div className="mx-auto max-w-6xl px-6 py-8">
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
            <Button variant="outline" size="icon" className="rounded-lg">
              <Filter size={20} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag: string) => (
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
        </div>

        <div className="rounded-lg bg-white shadow-md overflow-hidden">
          {filteredLaws.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nazwa</TableHead>
                    <TableHead>Ostatnia Aktualizacja</TableHead>
                    <TableHead>Tagi</TableHead>
                    <TableHead>Etap</TableHead>
                    <TableHead className="text-center">Akcje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLaws.map((law) => (
                    <TableRow key={law.id}>
                      <TableCell>
                        <a
                          href={`/law/${law.id}`}
                          className="text-indigo-700 underline hover:text-indigo-900"
                        >
                          {law.name}
                        </a>
                      </TableCell>
                      <TableCell>{law.lastUpdate}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {law.tags.map((tag: any) => (
                            <Badge key={tag.name} variant={tag.variant}>
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{law.stage}</TableCell>
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