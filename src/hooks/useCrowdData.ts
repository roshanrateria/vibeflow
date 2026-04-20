import { useState, useEffect } from 'react';
import type { CrowdDensity } from '@/types/types';
import { geminiService } from '@/services/geminiService';

export function useCrowdData() {
    const [crowdData, setCrowdData] = useState<CrowdDensity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCrowdData = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await geminiService.analyzeCrowdDensity();
            setCrowdData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch crowd data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCrowdData();

        // Update every 2 minutes
        const interval = setInterval(fetchCrowdData, 120000);

        return () => clearInterval(interval);
    }, []);

    return {
        crowdData,
        loading,
        error,
        refresh: fetchCrowdData,
    };
}
