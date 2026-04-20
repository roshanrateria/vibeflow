import type { CrowdDensity } from '@/types/types';
import { motion } from 'motion/react';

interface CrowdHeatmapProps {
    data: CrowdDensity[];
    width?: number;
    height?: number;
}

export function CrowdHeatmap({ data, width = 600, height = 400 }: CrowdHeatmapProps) {
    const getDensityColor = (level: string): string => {
        switch (level) {
            case 'low':
                return 'hsl(var(--density-low))';
            case 'medium':
                return 'hsl(var(--density-medium))';
            case 'high':
                return 'hsl(var(--density-high))';
            case 'critical':
                return 'hsl(var(--density-critical))';
            default:
                return 'hsl(var(--muted))';
        }
    };

    return (
        <div className="relative bg-muted rounded-lg overflow-hidden" style={{ width, height }}>
            <svg width={width} height={height} className="absolute inset-0">
                {data.map((density, index) => (
                    <motion.circle
                        key={`${density.location.x}-${density.location.y}-${index}`}
                        cx={density.location.x}
                        cy={density.location.y}
                        r={40}
                        fill={getDensityColor(density.level)}
                        opacity={0.6}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.6 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                ))}
            </svg>

            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
                <div className="text-xs font-semibold text-foreground mb-2">Density Legend</div>
                {['low', 'medium', 'high', 'critical'].map((level) => (
                    <div key={level} className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: getDensityColor(level) }}
                        />
                        <span className="text-xs text-foreground capitalize">{level}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
