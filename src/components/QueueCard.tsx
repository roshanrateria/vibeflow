import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin } from 'lucide-react';
import type { Queue } from '@/types/types';
import { motion } from 'motion/react';

interface QueueCardProps {
    queue: Queue;
    onBook: (queueId: string) => void;
    language: string;
}

export function QueueCard({ queue, onBook, language }: QueueCardProps) {
    const densityColor =
        queue.currentOccupancy / queue.capacity < 0.6
            ? 'text-density-low'
            : queue.currentOccupancy / queue.capacity < 0.85
                ? 'text-density-medium'
                : 'text-density-high';

    const waitTimeText = language === 'en' ? 'min wait' : 'मिनट प्रतीक्षा';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="glass-card hover:shadow-lg transition-all duration-300 premium-shadow rounded-3xl overflow-hidden">
                <CardHeader className="pb-3 border-b border-white/5">
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-lg flex items-center gap-2 mb-1">
                                <MapPin className="h-5 w-5 text-primary" />
                                {queue.locationName}
                            </CardTitle>
                            <CardDescription className="capitalize">{queue.locationType}</CardDescription>
                        </div>
                    </div>
                    {queue.tags && queue.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {queue.tags.map((tag, idx) => (
                                <span 
                                    key={idx} 
                                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${tag.toLowerCase().includes('non-veg') ? 'bg-red-500/20 text-red-500 border border-red-500/30' : tag.toLowerCase().includes('veg') ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 'bg-primary/20 text-primary border border-primary/30'}`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl">
                        <div className="flex items-center gap-2">
                            <Clock className={`h-5 w-5 ${densityColor}`} />
                            <span className={`font-semibold text-lg ${densityColor}`}>
                                {queue.currentWaitTime} {waitTimeText}
                            </span>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">
                            {queue.currentOccupancy}/{queue.capacity}
                        </span>
                    </div>

                    {queue.availableSlots.length > 0 && (
                        <Button onClick={() => onBook(queue.id)} className="w-full rounded-2xl h-11" size="sm">
                            {language === 'en' ? 'Book Slot' : 'स्लॉट बुक करें'}
                        </Button>
                    )}

                    {queue.availableSlots.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-2">
                            {language === 'en' ? 'No slots available' : 'कोई स्लॉट उपलब्ध नहीं'}
                        </p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
