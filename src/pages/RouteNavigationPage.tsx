import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Navigation, Clock, MapPin } from 'lucide-react';
import { demoRoutes } from '@/utils/fallbackData';

export default function RouteNavigationPage() {
    const { language, t } = useLanguage();
    const navigate = useNavigate();

    const route = demoRoutes[0];

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-bold">{t('navigation')}</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 max-w-2xl">
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Navigation className="h-5 w-5 text-primary" />
                                {language === 'en' ? 'Active Route' : 'सक्रिय मार्ग'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span className="font-semibold">{route.estimatedTime} {t('minutes')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span className="text-sm text-muted-foreground">{route.distance}m</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {route.steps.map((step, index) => (
                                    <motion.div
                                        key={`${step.location.x}-${step.location.y}`}
                                        className="flex gap-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                                                {index + 1}
                                            </div>
                                            {index < route.steps.length - 1 && (
                                                <div className="w-0.5 h-12 bg-border mt-2" />
                                            )}
                                        </div>
                                        <div className="flex-1 pb-4">
                                            <p className="font-medium">{step.instruction}</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {step.distance}m • {step.estimatedTime} {t('minutes')}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Button onClick={() => navigate('/dashboard')} className="w-full">
                        {language === 'en' ? 'Back to Dashboard' : 'डैशबोर्ड पर वापस जाएं'}
                    </Button>
                </motion.div>
            </main>
        </div>
    );
}
