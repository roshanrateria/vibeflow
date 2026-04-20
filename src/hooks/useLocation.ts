import { useState, useEffect } from 'react';
import type { Location } from '@/types/types';

export function useLocation() {
    const [location, setLocation] = useState<Location>({
        x: 100,
        y: 200,
        section: 'A',
        floor: 1,
    });

    const [isTracking, setIsTracking] = useState(false);

    useEffect(() => {
        if (!isTracking) return;

        // Simulate location updates
        const interval = setInterval(() => {
            setLocation((prev) => ({
                ...prev,
                x: prev.x + Math.random() * 10 - 5,
                y: prev.y + Math.random() * 10 - 5,
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, [isTracking]);

    const startTracking = () => setIsTracking(true);
    const stopTracking = () => setIsTracking(false);

    return {
        location,
        setLocation,
        isTracking,
        startTracking,
        stopTracking,
    };
}