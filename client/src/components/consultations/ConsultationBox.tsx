import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Consultation } from '@/mock_data/consultations';

interface ConsultationBoxProps {
  title: string;
  consultations: Consultation[];
}

export default function ConsultationBox({ title, consultations }: ConsultationBoxProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      
      <div className="space-y-4">
        {consultations.map((consultation) => {
          const externalLink = consultation.documents[0]?.url !== '#' 
            ? consultation.documents[0].url 
            : null;
          
          return (
            <div
              key={consultation.id}
              className="border border-gray-200 rounded p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  {externalLink ? (
                    <a
                      href={externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-gray-900 hover:text-indigo-700 hover:underline"
                    >
                      {consultation.title}
                    </a>
                  ) : (
                    <Link
                      href={`/konsultacje/${consultation.id}`}
                      className="text-base font-semibold text-gray-900 hover:text-indigo-700 hover:underline"
                    >
                      {consultation.title}
                    </Link>
                  )}
                  <p className="text-sm text-gray-600 mt-1">{consultation.projectNumber}</p>
                </div>
                <div 
                  className="text-sm text-gray-500 flex items-center gap-1"
                  title={`${consultation.popularity.toLocaleString()} kliknięć`}
                >
                  <span>↗</span>
                  <span>{consultation.popularity.toLocaleString()}</span>
                </div>
              </div>

            <p className="text-sm text-gray-700 mb-2 line-clamp-2">
              {consultation.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-2">{consultation.tags.map((tag) => (
                <Badge key={tag.name} variant={tag.variant}>
                  {tag.name}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-600">
                <span>Do: {new Date(consultation.endDate).toLocaleDateString('pl-PL')}</span>
              </div>
              <Badge variant="outline">{consultation.status}</Badge>
            </div>
          </div>
        );
        })}
      </div>

      {consultations.length === 0 && (
        <p className="text-center text-gray-500 py-8">Brak aktywnych konsultacji</p>
      )}
    </div>
  );
}
