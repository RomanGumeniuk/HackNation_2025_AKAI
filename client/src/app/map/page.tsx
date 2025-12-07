"use client";

import Map from "@/components/map/Map";
import { LatLngExpression } from "leaflet";

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