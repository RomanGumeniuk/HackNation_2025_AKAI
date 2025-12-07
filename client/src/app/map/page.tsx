"use client";

import dynamic from 'next/dynamic';
import { LatLngExpression } from "leaflet";

const Map = dynamic(() => import('@/components/map/Map'), { 
    ssr: false,
    loading: () => <div className="w-full min-w-96 h-96 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">Ładowanie mapy...</div>
});

export default function page(){

    const markers: LatLngExpression[] = [
        [53.1235, 18.0084],
        [52.2297, 21.0122],
        [51.1079, 17.0385]
    ]
    
    return(
        <>
            <div className="w-64 h-96">
                <Map markers={markers} />
            </div>
        </>
    )
}