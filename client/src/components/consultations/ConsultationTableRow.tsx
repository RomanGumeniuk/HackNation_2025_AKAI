import { Badge } from '@/components/ui/badge';
import { TableRow, TableCell } from '@/components/ui/table';
import { Consultation } from '@/mock_data/consultations';

function getStatusBadgeClassName(status: string): string {
  const statusMap: Record<string, string> = {
    'Prekonsultacje': 'bg-blue-50 text-blue-700 border-blue-300',
    'W trakcie konsultacji': 'bg-emerald-50 text-emerald-700 border-emerald-300',
    'Opiniowanie': 'bg-amber-50 text-amber-700 border-amber-300',
    'Zakończone': 'bg-gray-50 text-gray-600 border-gray-300',
  };
  return statusMap[status] || 'bg-gray-50 text-gray-700 border-gray-300';
}

export function ConsultationTableRow({ consultation }: { consultation: Consultation }) {
  const externalLink = consultation.documents[0]?.url !== '#' 
    ? consultation.documents[0].url 
    : null;

  return (
    <TableRow className="hover:bg-gray-50/50 transition-colors border-b border-gray-200">
      <TableCell>
        {externalLink ? (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:text-[#394788] hover:underline font-medium text-sm"
          >
            {consultation.title}
          </a>
        ) : (
          <a
            href={`/konsultacje/${consultation.id}`}
            className="text-gray-900 hover:text-[#394788] hover:underline font-medium text-sm"
          >
            {consultation.title}
          </a>
        )}
        <div className="text-xs text-gray-500 mt-1">
          {consultation.projectNumber}
        </div>
        {consultation.type === 'samorządowe' && consultation.city && (
          <div className="text-xs text-gray-600 mt-1">
            {consultation.city}
          </div>
        )}
      </TableCell>
      <TableCell className="text-sm text-gray-700">
        {consultation.proposer}
      </TableCell>
      <TableCell>
        <div className="text-sm text-gray-700">
          {new Date(consultation.endDate).toLocaleDateString('pl-PL')}
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={getStatusBadgeClassName(consultation.status)}
        >
          {consultation.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {consultation.tags.slice(0, 2).map((tag) => (
            <Badge key={tag.name} variant={tag.variant} className="text-xs">
              {tag.name}
            </Badge>
          ))}
          {consultation.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{consultation.tags.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
