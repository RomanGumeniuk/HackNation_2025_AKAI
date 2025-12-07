"use client";
import "leaflet/dist/leaflet.css"
import {MapContainer,TileLayer,Marker,Popup, useMap} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import L from "leaflet";
import { useRef, useEffect } from "react";


const bydgoszczPosition:LatLngExpression = [53.1235, 18.0084]

// Custom icon for the marker
const customIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

// Component to handle map adjustments
function MapController({markers}: {markers?: Array<LatLngExpression>}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Mode 1: Multiple markers - zoom out to fit all
    if (markers && markers.length > 1) {
      const bounds = L.latLngBounds(markers);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
    // Mode 2: Single marker only - zoom to level 6 and center on it
    else if (markers && markers.length === 1) {
      map.setView(markers[0], 12);
    }
    // Default case: show default position
    else {
      map.setView(bydgoszczPosition, 5);
    }
  }, [map, markers]);

  return null;
}

export default function Map(props:{markers?:Array<LatLngExpression>}){
    const mapRef = useRef<L.Map>(null);
    
    return(
        <div className="w-full min-w-96 h-96">
            <MapContainer 
                center={bydgoszczPosition} 
                zoom={5}
                className="w-full h-full"
                ref={mapRef}
            >
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapController markers={props.markers} />
                {props.markers?.map((position, idx) => (
                    <Marker key={idx} position={position} icon={customIcon}>
                        <Popup>
                            <div className="font-semibold">Marker {idx + 1}</div>                          
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}