import { useEffect, useState } from 'react';
import { MapPin, Navigation, Phone, Globe, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface GoogleMapProps {
    language: string;
}

const BHARAT_MANDAPAM_LOCATION = {
    lat: 28.6211,
    lng: 77.2410,
    address: 'Pragati Maidan, New Delhi, Delhi 110001',
    phone: '+91-11-2337-1540',
};

const crowdZones = [
    { id: 1, lat: 28.6218, lng: 77.2405, density: 'high', name: 'Main Hall A' },
    { id: 2, lat: 28.6205, lng: 77.2415, density: 'low', name: 'Food Court' },
    { id: 3, lat: 28.6195, lng: 77.2420, density: 'medium', name: 'Exhibition B' },
    { id: 4, lat: 28.6225, lng: 77.2395, density: 'critical', name: 'Entry Gate C' }
];

function getDensityColor(density: string) {
    switch (density) {
        case 'low': return '#22c55e';
        case 'medium': return '#eab308';
        case 'high': return '#f97316';
        case 'critical': return '#ef4444';
        default: return '#3b82f6';
    }
}

export function GoogleMapComponent({ language }: GoogleMapProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleGetDirections = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${BHARAT_MANDAPAM_LOCATION.lat},${BHARAT_MANDAPAM_LOCATION.lng}`;
        window.open(url, '_blank');
    };

    if (!mounted) return <div className="h-[500px] w-full bg-muted flex items-center justify-center animate-pulse rounded-2xl" />;

    return (
        <div className="w-full relative rounded-b-3xl overflow-hidden glass-card">
            <div className="h-[500px] w-full z-0">
                <MapContainer 
                    center={[BHARAT_MANDAPAM_LOCATION.lat, BHARAT_MANDAPAM_LOCATION.lng]} 
                    zoom={16} 
                    scrollWheelZoom={false}
                    className="h-full w-full rounded-b-3xl z-0"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    
                    <Marker position={[BHARAT_MANDAPAM_LOCATION.lat, BHARAT_MANDAPAM_LOCATION.lng]}>
                        <Popup className="glass-popup">
                            <div className="font-semibold text-lg">{language === 'en' ? 'Bharat Mandapam' : 'भारत मंडपम'}</div>
                            <div className="text-sm opacity-80 mt-1">{BHARAT_MANDAPAM_LOCATION.address}</div>
                        </Popup>
                    </Marker>

                    {crowdZones.map(zone => (
                        <CircleMarker
                            key={zone.id}
                            center={[zone.lat, zone.lng]}
                            pathOptions={{ fillColor: getDensityColor(zone.density), color: getDensityColor(zone.density), weight: 2, bgOpacity: 0.8 }}
                            radius={24}
                        >
                            <Popup>
                                <div className="font-medium">{zone.name}</div>
                                <div className="text-xs uppercase mt-1 opacity-70">Density: {zone.density}</div>
                            </Popup>
                        </CircleMarker>
                    ))}
                </MapContainer>
            </div>

            <div className="absolute top-4 left-4 right-4 z-[400] pointer-events-none">
                <div className="bg-background/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/10 max-w-sm pointer-events-auto">
                    <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                        <Layers className="h-4 w-4 text-primary" />
                        {language === 'en' ? 'Live Interactive Map' : 'लाइव इंटरएक्टिव मानचित्र'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {language === 'en'
                            ? 'Showing real-time venue locations and crowd densities across Bharat Mandapam.'
                            : 'भारत मंडपम में वास्तविक समय स्थान और भीड़ घनत्व दिखा रहा है।'}
                    </p>
                </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-[400] pointer-events-none">
                <div className="bg-background/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10 pointer-events-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <p className="text-sm font-semibold">{BHARAT_MANDAPAM_LOCATION.address}</p>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground ml-6">
                                <Phone className="h-3 w-3" />
                                <p className="text-xs">{BHARAT_MANDAPAM_LOCATION.phone}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleGetDirections}
                                size="sm"
                                className="rounded-xl h-10 px-4"
                            >
                                <Navigation className="h-4 w-4 mr-2" />
                                {language === 'en' ? 'Get Directions' : 'दिशा-निर्देश प्राप्त करें'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
