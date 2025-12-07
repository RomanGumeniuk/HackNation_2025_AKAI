'use client'; // Required for useState

import { useState } from 'react';

interface PdfViewerProps {
    url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50 py-10 px-4">
            {/* Header / Title Section */}
            <div className="w-full max-w-4xl mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Document Preview</h1>
                <a
                    href={url}
                    download
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
                >
                    Download PDF
                </a>
            </div>

            {/* The Viewer Container */}
            <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">

                {/* Loading Spinner - Visible while loading */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 text-sm font-medium">Loading Document...</p>
                        </div>
                    </div>
                )}

                {/* The Iframe */}
                <iframe
                    src={url}
                    className="w-full h-full"
                    title="PDF Viewer"
                    onLoad={() => setIsLoading(false)}
                    style={{ border: 'none' }} // Ensure no default browser borders
                />
            </div>

            <p className="mt-4 text-gray-400 text-xs text-center">
                If the PDF does not load, you can download it using the button above.
            </p>
        </div>
    );
}