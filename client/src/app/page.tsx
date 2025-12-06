import { lawsData } from '@/mock_data/laws';
import { BookmarkCheck } from 'lucide-react';

export default function Home() {
    return (

        );
}


        // <>
        //     <div className="flex justify-center items-center m-8 h-full">
        //     <h1 className="text-[2rem] font-bold">Witaj w Obywatelu Prawa zobacz najnowsze aktualizacje dotyczące prawa w polsce i nie tylko!</h1>
        //     </div>
        //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-8">
        //     <div>
        //         <h2 className="text-2xl font-bold mb-4">Najgorętsze ustawy</h2>
        //         <table className="w-full border-collapse border border-gray-300">
        //         <thead className="bg-gray-200">
        //             <tr>
        //             <th className="border border-gray-300 p-2 text-left">Nazwa</th>
        //             <th className="border border-gray-300 p-2 text-left">Aktualizacja</th>
        //             <th className="border border-gray-300 p-2 text-left"><BookmarkCheck size={24}/></th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {lawsData.sort((a, b) => b.follows - a.follows).slice(0, 5).map((law) => (
        //             <tr key={law.id}>
        //                 <td className="border border-gray-300 p-2"><a href={`/ustawu/${law.id}`} className="text-blue-600 hover:underline">{law.name}</a></td>
        //                 <td className="border border-gray-300 p-2">{law.lastUpdate}</td>
        //                 <td className="border border-gray-300 p-2">{law.follows}</td>

        //             </tr>
        //             ))}
        //         </tbody>
        //         </table>
        //     </div>
        //     <div>
        //         <h2 className="text-2xl font-bold mb-4">Ostatnie aktualizacje</h2>
        //         <table className="w-full border-collapse border border-gray-300">
        //         <thead className="bg-gray-200">
        //             <tr>
        //             <th className="border border-gray-300 p-2 text-left">Nazwa</th>
        //             <th className="border border-gray-300 p-2 text-left">Aktualizacja</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {lawsData.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()).slice(0, 5).map((law) => (
        //             <tr key={law.id}>
        //                 <td className="border border-gray-300 p-2"><a href={`/ustawu/${law.id}`} className="text-blue-600 hover:underline">{law.name}</a></td>
        //                 <td className="border border-gray-300 p-2">{law.lastUpdate}</td>
        //             </tr>
        //             ))}
        //         </tbody>
        //         </table>
        //     </div>
        //     </div>
        // </>