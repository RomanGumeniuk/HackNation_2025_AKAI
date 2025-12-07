"use client";

import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";

// Import Map component with SSR disabled
const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
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