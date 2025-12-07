import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

interface ConsultationsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ConsultationsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ConsultationsPaginationProps) {
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= maxVisible; i++) pages.push(i);
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} text-[#394788]`}
            />
          </PaginationItem>
          {getPageNumbers().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                className={page === currentPage ? 'bg-[#394788] text-white' : 'text-[#394788]'}
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
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} text-[#394788]`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
