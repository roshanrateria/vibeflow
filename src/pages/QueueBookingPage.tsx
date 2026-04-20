import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QueueCard } from '@/components/QueueCard';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { demoQueues } from '@/utils/fallbackData';
import { toast } from 'sonner';

export default function QueueBookingPage() {
    const { language, t } = useLanguage();
    const navigate = useNavigate();
    const [bookedQueues, setBookedQueues] = useState<string[]>([]);

    const handleBook = (queueId: string) => {
        setBookedQueues((prev) => [...prev, queueId]);
        toast.success(
            language === 'en'
                ? 'Slot booked successfully!'
                : 'स्लॉट सफलतापूर्वक बुक किया गया!',
            {
                description:
                    language === 'en'
                        ? 'You will receive a notification when to proceed.'
                        : 'आगे बढ़ने के लिए आपको एक सूचना प्राप्त होगी।',
            }
        );
    };

    return (
        <div className="min-h-screen bg-transparent relative z-0 text-foreground">
            <header className="border-b border-white/5 backdrop-blur-2xl bg-black/40 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="rounded-2xl hover:bg-white/10">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        {t('queueManagement')}
                    </h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">
                                {language === 'en' ? 'Book Your Spot' : 'अपना स्थान बुक करें'}
                            </h2>
                            <p className="text-muted-foreground text-sm max-w-xl">
                                {language === 'en' 
                                    ? 'Avoid waiting in lines. Book a virtual spot for food, merchandise, or restrooms and we will notify you when it is your turn.' 
                                    : 'लाइनों में प्रतीक्षा करने से बचें। भोजन या अन्य के लिए वर्चुअल स्पॉट बुक करें।'}
                            </p>
                        </div>
                        
                        {bookedQueues.length > 0 && (
                            <div className="glass-card px-6 py-3 rounded-full border border-primary/30 shrink-0 flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-sm font-medium">
                                    {bookedQueues.length} {language === 'en' ? 'Active Bookings' : 'सक्रिय बुकिंग'}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {demoQueues.map((queue) => (
                            <QueueCard
                                key={queue.id}
                                queue={queue}
                                onBook={handleBook}
                                language={language}
                            />
                        ))}
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
