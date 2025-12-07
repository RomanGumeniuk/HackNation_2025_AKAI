import PdfViewer from '@/components/pdf/PdfViewer';

export default function PdfPage() {
    // Path references the 'public' folder in Next.js
    const pdfUrl = "/dokument.pdf";

    return (
        <main>
            <PdfViewer url={pdfUrl} />
        </main>
    );
}