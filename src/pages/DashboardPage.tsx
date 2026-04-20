import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VenueMapComponent } from '@/components/VenueMapComponent';
import { GoogleMapComponent } from '@/components/GoogleMapComponent';
import { QueueCard } from '@/components/QueueCard';
import { GroupPanel } from '@/components/GroupPanel';
import { VibePauseCard } from '@/components/VibePauseCard';
import { SafetyAlert } from '@/components/SafetyAlert';
import { LanguageSelector } from '@/components/LanguageSelector';
import { DemoTip } from '@/components/DemoTip';
import { useLanguage } from '@/hooks/useLanguage';
import { useSession } from '@/hooks/useSession';
import { useCrowdData } from '@/hooks/useCrowdData';
import { useLocation } from '@/hooks/useLocation';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { demoVenueMap, demoQueues, demoVibePauseContent } from '@/utils/fallbackData';
import { MapPin, Clock, Users, Sparkles, Menu, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import type { Language, SafetyAlert as SafetyAlertType } from '@/types/types';

export default function DashboardPage() {
    const { language, setLanguage, t } = useLanguage();
    const { user, endSession } = useSession();
    const { crowdData, refresh } = useCrowdData();
    const { location } = useLocation();
    const navigate = useNavigate();

    const [safetyAlerts] = useState<SafetyAlertType[]>([
        {
            id: 'alert-1',
            type: 'high-density',
            severity: 'medium',
            location: { x: 300, y: 200, section: 'B' },
            message:
                language === 'en'
                    ? 'High crowd density detected in Section B. Consider alternative routes.'
                    : 'अनुभाग B में उच्च भीड़ घनत्व का पता चला। वैकल्पिक मार्गों पर विचार करें।',
            timestamp: new Date(),
        },
    ]);

    const handleLogout = () => {
        endSession();
        navigate('/');
    };

    const handleBookQueue = (queueId: string) => {
        navigate(`/queue-booking?queueId=${queueId}`);
    };

    const venueMapWithCrowdData = {
        ...demoVenueMap,
        heatmap: crowdData.length > 0 ? crowdData : demoVenueMap.heatmap,
    };

    const [groupData, setGroupData] = useState<QRCodeData | null>(null);
    const [groupMembers, setGroupMembers] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            const savedGroup = localStorage.getItem(`vibeflow_group_${user.id}`);
            if (savedGroup) {
                const parsed = JSON.parse(savedGroup);
                setGroupData(parsed);
                const savedMembers = localStorage.getItem(`vibeflow_members_${parsed.groupId}`);
                if (savedMembers) {
                    setGroupMembers(JSON.parse(savedMembers));
                }
            }
        }
    }, [user]);

    const activeGroup = groupData ? {
        id: groupData.groupId,
        name: groupData.groupName,
        members: groupMembers,
        createdBy: groupData.userId,
        shareLink: `https://vibeflow.ai/join/${groupData.groupId}`,
    } : null;

    return (
        <div className="min-h-screen bg-transparent relative z-0 text-foreground">
            <header className="border-b border-white/5 backdrop-blur-2xl bg-black/40 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden rounded-2xl">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="rounded-r-3xl">
                                <nav className="space-y-3 mt-8">
                                    <Button variant="ghost" className="w-full justify-start rounded-2xl" onClick={() => navigate('/dashboard')}>
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {t('dashboard')}
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start rounded-2xl" onClick={() => navigate('/navigation')}>
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {t('navigation')}
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start rounded-2xl" onClick={() => navigate('/queue-booking')}>
                                        <Clock className="h-4 w-4 mr-2" />
                                        {t('queueManagement')}
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start rounded-2xl" onClick={() => navigate('/group')}>
                                        <Users className="h-4 w-4 mr-2" />
                                        {t('groupCoordination')}
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-destructive rounded-2xl" onClick={handleLogout}>
                                        <LogOut className="h-4 w-4 mr-2" />
                                        {language === 'en' ? 'Logout' : 'लॉग आउट'}
                                    </Button>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <h1 className="text-lg md:text-xl font-bold gradient-text">{t('appName')}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <LanguageSelector value={language} onChange={setLanguage as (lang: Language) => void} />
                        <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden lg:flex rounded-2xl">
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <DemoTip
                        message={
                            language === 'en'
                                ? '🎯 Welcome to your dashboard! Explore the tabs below to view the live map, book queues, coordinate with your group, and enjoy Vibe Pause content.'
                                : '🎯 अपने डैशबोर्ड में आपका स्वागत है! लाइव मानचित्र देखने, कतारें बुक करने, अपने समूह के साथ समन्वय करने और वाइब पॉज़ सामग्री का आनंद लेने के लिए नीचे दिए गए टैब का अन्वेषण करें।'
                        }
                        type="success"
                    />

                    {safetyAlerts.map((alert) => (
                        <SafetyAlert key={alert.id} alert={alert} />
                    ))}

                    <Tabs defaultValue="map" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4 max-w-2xl rounded-2xl p-1 h-auto">
                            <TabsTrigger value="map" className="rounded-xl py-3">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="hidden md:inline">{language === 'en' ? 'Map' : 'मानचित्र'}</span>
                            </TabsTrigger>
                            <TabsTrigger value="queue" className="rounded-xl py-3">
                                <Clock className="h-4 w-4 mr-2" />
                                <span className="hidden md:inline">{language === 'en' ? 'Queues' : 'कतारें'}</span>
                            </TabsTrigger>
                            <TabsTrigger value="group" className="rounded-xl py-3">
                                <Users className="h-4 w-4 mr-2" />
                                <span className="hidden md:inline">{language === 'en' ? 'Group' : 'समूह'}</span>
                            </TabsTrigger>
                            <TabsTrigger value="vibe" className="rounded-xl py-3">
                                <Sparkles className="h-4 w-4 mr-2" />
                                <span className="hidden md:inline">{language === 'en' ? 'Vibe' : 'वाइब'}</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="map" className="space-y-4">


                            <Card className="glass-card premium-shadow rounded-3xl overflow-hidden">
                                <CardHeader className="pb-3 border-b border-white/5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                <MapPin className="h-5 w-5 text-primary" />
                                                {language === 'en' ? 'Live Event Map' : 'लाइव इवेंट मानचित्र'}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {language === 'en'
                                                    ? 'Interactive Navigation map for India International Convention Centre'
                                                    : 'भारत अंतर्राष्ट्रीय सम्मेलन केंद्र के लिए इंटरएक्टिव नेविगेशन मानचित्र'}
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={refresh} className="rounded-xl">
                                            {language === 'en' ? 'Refresh Heatmap' : 'हीटमैप रीफ्रेश'}
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <GoogleMapComponent language={language} />
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="border-0 bg-density-low/10 rounded-2xl">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded-full bg-density-low" />
                                            <div>
                                                <p className="text-sm font-medium">{t('low')}</p>
                                                <p className="text-xs text-muted-foreground">0-30%</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-0 bg-density-medium/10 rounded-2xl">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded-full bg-density-medium" />
                                            <div>
                                                <p className="text-sm font-medium">{t('medium')}</p>
                                                <p className="text-xs text-muted-foreground">31-60%</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="glass-card bg-density-high/10 rounded-2xl">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded-full bg-density-high" />
                                            <div>
                                                <p className="text-sm font-medium">{t('high')}</p>
                                                <p className="text-xs text-muted-foreground">61-85%</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="queue" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {demoQueues.map((queue) => (
                                    <QueueCard key={queue.id} queue={queue} onBook={handleBookQueue} language={language} />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="group" className="space-y-4">
                            {!activeGroup ? (
                                <Card className="glass-card premium-shadow rounded-3xl text-center p-8">
                                    <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">
                                        {language === 'en' ? 'No Active Group' : 'कोई सक्रिय समूह नहीं'}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                                        {language === 'en' 
                                            ? 'Create or join a group to coordinate, share locations, and text with your friends.' 
                                            : 'समन्वय करने, स्थान साझा करने और अपने दोस्तों के साथ चैट करने के लिए एक समूह बनाएं या उसमें शामिल हों!'}
                                    </p>
                                    <div className="flex gap-4 max-w-sm mx-auto">
                                        <Button onClick={() => navigate('/group')} className="w-full rounded-2xl h-12">
                                            {language === 'en' ? 'Create / Join Group' : 'समूह बनाएं / शामिल हों'}
                                        </Button>
                                    </div>
                                </Card>
                            ) : (
                                <>
                                    <GroupPanel group={activeGroup as any} language={language} />
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                        <Button onClick={() => navigate('/group')} variant="secondary" className="rounded-2xl h-12">
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            Chat
                                        </Button>
                                        <Button onClick={() => navigate('/group')} variant="secondary" className="rounded-2xl h-12">
                                            <Phone className="h-4 w-4 mr-2" />
                                            Call
                                        </Button>
                                        <Button onClick={() => navigate('/group')} variant="secondary" className="rounded-2xl h-12 md:col-span-2">
                                            <QrCode className="h-4 w-4 mr-2" />
                                            Add Members
                                        </Button>
                                    </div>
                                    <Button onClick={() => navigate('/group')} className="w-full rounded-2xl h-12 mt-4 bg-primary text-primary-foreground">
                                        {language === 'en' ? 'Manage Group' : 'समूह प्रबंधित करें'}
                                    </Button>
                                </>
                            )}
                        </TabsContent>

                        <TabsContent value="vibe" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {demoVibePauseContent.slice(0, 4).map((content) => (
                                    <VibePauseCard key={content.id} content={content} />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </main>
        </div>
    );
}

