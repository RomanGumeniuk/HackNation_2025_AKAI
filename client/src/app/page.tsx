import { lawsData } from '@/mock_data/laws';
import { ArrowRight, BookmarkCheck, Calendar, Flame} from 'lucide-react';
import CountUp from '@/components/CountUp';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4 h-64 w-full ">
                <div style={{fontWeight:600}} className='text-4xl text-bold'>Wszystkie ustawy na wyciągnięcie myszki</div>
                <div className='max-w-1/2 flex flex-col flex-wrap'>
                    <div className="text-center text-lg text-gray-800">Poznaj najnowsze zmiany w prawie krajowym. Przeglądaj, śledź i bądź na bieżąco z aktualizacjami ustaw, które kształtują naszą rzeczywistość.</div>
                </div>
                <div className='max-w-1/2 flex gap-5'>
                    <Link href="/ustawy" className="px-6 py-3">
                        <Button className='bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition cursor-pointer'>Zobacz ustawy</Button>
                    </Link>
                    <Link href="/konsultacje" className="px-6 py-3">
                        <Button className='bg-white text-black border-[1px] border-black rounded-md shadow-sm hover:bg-stone-200 transition cursor-pointer'>Przejdź do konsultacji</Button>
                    </Link>
                </div>
            </div>
               
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 m-8">
    
    <div>
        <div className="flex items-center gap-2 mb-6">            
            <h2 className="text-2xl font-bold text-gray-800">Najgorętsze ustawy</h2>
        </div>

        <div className="flex flex-col gap-4">
            {lawsData
                .sort((a, b) => b.follows - a.follows)
                .slice(0, 5)
                .map((law) => (
                    <div key={law.id} className="group bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div className="pr-4">
                                <a href={`/ustawy/${law.id}`} className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors block mb-1">
                                    {law.name}
                                </a>
                                <div className="flex items-center text-sm text-gray-500 gap-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} /> {law.lastUpdate}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center justify-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                                <BookmarkCheck className="text-blue-500 mb-1" size={20} />
                                <span className="font-bold text-gray-700 text-sm">
                                    <CountUp to={law.follows} duration={1.5} separator="," />
                                </span>
                            </div>
                        </div>
                    </div>
            ))}
        </div>
    </div>

    {/* SEKCJA 2: MINIMALISTYCZNA LISTA (Ostatnie aktualizacje) */}
    <div>
        <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Ostatnie aktualizacje</h2>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nazwa ustawy</th>
                        <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Data zmiany</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {lawsData
                        .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
                        .slice(0, 5)
                        .map((law) => (
                        <tr key={law.id} className="hover:bg-blue-50/30 transition-colors">
                            <td className="p-4">
                                <a href={`/ustawu/${law.id}`} className="text-gray-700 font-medium hover:text-blue-600 transition-colors line-clamp-1">
                                    {law.name}
                                </a>
                            </td>
                            <td className="p-4 text-right text-sm text-gray-500 whitespace-nowrap font-mono">
                                {law.lastUpdate}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {/* Przycisk "Zobacz więcej" na dole */}
        {/* <div className="mt-4 text-right">
             <a href="/wszystkie" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Zobacz wszystkie zmiany <ArrowRight size={16} className="ml-1"/>
             </a>
        </div> */}

    </div>
</div>
        </>
    );
}
