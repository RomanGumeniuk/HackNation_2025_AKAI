import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Consultation } from '@/mock_data/consultations';
import { TrendingUp } from 'lucide-react';

interface ConsultationBoxProps {
  title: string;
  consultations: Consultation[];
}

export default function ConsultationBox({ title, consultations }: ConsultationBoxProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 bg-linear-to-r from-[#394788]/5 to-transparent border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {consultations.map((consultation) => {
          const externalLink = consultation.documents[0]?.url !== '#' 
            ? consultation.documents[0].url 
            : null;
          
          return (
            <div
              key={consultation.id}
              className="px-6 py-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2 gap-3">
                <div className="flex-1 min-w-0">
                  {externalLink ? (
                    <a
                      href={externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#394788] hover:text-[#2a3560] wrap-break-word"
                    >
                      {consultation.title}
                    </a>
                  ) : (
                    <Link
                      href={`/konsultacje/${consultation.id}`}
                      className="text-sm font-semibold text-[#394788] hover:text-[#2a3560]"
                    >
                      {consultation.title}
                    </Link>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{consultation.projectNumber}</p>
                </div>
                <div 
                  className="text-xs text-[#394788] flex items-center gap-1 whitespace-nowrap"
                  title={`${consultation.popularity.toLocaleString()} kliknięć`}
                >
                  <TrendingUp size={14} />
                  <span>{consultation.popularity.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {consultation.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {consultation.tags.map((tag) => (
                  <Badge key={tag.name} variant={tag.variant} className="text-xs">
                    {tag.name}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs">
                <div className="text-gray-600">
                  <span>Do: {new Date(consultation.endDate).toLocaleDateString('pl-PL')}</span>
                </div>
                <Badge variant="outline" className="text-xs border-[#394788] text-[#394788]">
                  {consultation.status}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      {consultations.length === 0 && (
        <p className="text-center text-gray-500 py-8 text-sm">Brak aktywnych konsultacji</p>
      )}
    </div>
  );
}
