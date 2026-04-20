import type { VenueMap } from '@/types/types';
import { CrowdHeatmap } from './CrowdHeatmap';
import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface VenueMapComponentProps {
    venueMap: VenueMap;
    userLocation?: { x: number; y: number };
}

export function VenueMapComponent({ venueMap, userLocation }: VenueMapComponentProps) {
    return (
        <div className="relative">
            <CrowdHeatmap data={venueMap.heatmap} width={600} height={400} />

            {userLocation && (
                <motion.div
                    className="absolute"
                    style={{
                        left: userLocation.x - 12,
                        top: userLocation.y - 24,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <MapPin className="h-6 w-6 text-primary fill-primary drop-shadow-lg" />
                </motion.div>
            )}

            {venueMap.amenities.map((amenity) => (
                <motion.div
                    key={amenity.id}
                    className="absolute"
                    style={{
                        left: amenity.location.x - 8,
                        top: amenity.location.y - 8,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-md" />
                </motion.div>
            ))}
        </div>
    );
}
