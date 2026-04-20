import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Zap, Users, Clock, Shield, TrendingUp, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { geminiService } from '@/services/geminiService';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
    const { language, setLanguage, t } = useLanguage();
    const navigate = useNavigate();

    const features = [
        {
            icon: MapPin,
            title: language === 'en' ? 'Smart Navigation' : 'स्मार्ट नेविगेशन',
            description:
                language === 'en'
                    ? 'AI-powered routes that avoid crowds'
                    : 'भीड़ से बचने वाले AI-संचालित मार्ग',
        },
        {
            icon: Clock,
            title: language === 'en' ? 'Zero Wait Times' : 'शून्य प्रतीक्षा समय',
            description:
                language === 'en'
                    ? 'Dynamic queue booking for concessions'
                    : 'रियायतों के लिए गतिशील कतार बुकिंग',
        },
        {
            icon: Users,
            title: language === 'en' ? 'Group Sync' : 'समूह समन्वय',
            description:
                language === 'en'
                    ? 'Intelligent coordination for families'
                    : 'परिवारों के लिए बुद्धिमान समन्वय',
        },
        {
            icon: Shield,
            title: language === 'en' ? 'Safety First' : 'सुरक्षा पहले',
            description:
                language === 'en'
                    ? 'Real-time alerts for bottlenecks'
                    : 'अवरोधों के लिए वास्तविक समय अलर्ट',
        },
        {
            icon: TrendingUp,
            title: language === 'en' ? 'Live Updates' : 'लाइव अपडेट',
            description:
                language === 'en'
                    ? 'Crowd density tracking every 2 minutes'
                    : 'हर 2 मिनट में भीड़ घनत्व ट्रैकिंग',
        },
        {
            icon: Zap,
            title: language === 'en' ? 'Vibe Pause' : 'वाइब पॉज़',
            description:
                language === 'en'
                    ? 'Engaging content during wait times'
                    : 'प्रतीक्षा समय के दौरान आकर्षक सामग्री',
        },
    ];

    const demoSteps = [
        {
            number: '01',
            title: language === 'en' ? 'Quick Onboarding' : 'त्वरित ऑनबोर्डिंग',
            description:
                language === 'en'
                    ? 'Enter your ticket and preferences in seconds'
                    : 'सेकंड में अपना टिकट और प्राथमिकताएं दर्ज करें',
        },
        {
            number: '02',
            title: language === 'en' ? 'Live Dashboard' : 'लाइव डैशबोर्ड',
            description:
                language === 'en'
                    ? 'View real-time crowd heatmap and navigate smartly'
                    : 'वास्तविक समय भीड़ हीटमैप देखें और स्मार्ट नेविगेट करें',
        },
        {
            number: '03',
            title: language === 'en' ? 'Book & Coordinate' : 'बुक और समन्वय',
            description:
                language === 'en'
                    ? 'Reserve queue slots and sync with your group'
                    : 'कतार स्लॉट आरक्षित करें और अपने समूह के साथ समन्वय करें',
        },
    ];

    return (
        <div className="min-h-screen bg-transparent text-foreground relative z-0">
            <header className="border-b border-white/5 backdrop-blur-2xl bg-black/40 sticky top-0 z-10">
                <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                    <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold gradient-text">{t('appName')}</h1>
                    </motion.div>
                    <LanguageSelector value={language} onChange={setLanguage} />
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6">
                {/* Hero Section */}
                <motion.div
                    className="text-center max-w-5xl mx-auto pt-12 md:pt-16 lg:pt-24 pb-8 md:pb-12 lg:pb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {geminiService.isDemoMode() && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="mb-4 md:mb-6"
                        >
                            <Badge variant="secondary" className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-full">
                                <Sparkles className="h-3 w-3 mr-1.5 md:mr-2 inline" />
                                {language === 'en' ? 'Demo Mode - Full Experience Available' : 'डेमो मोड - पूर्ण अनुभव उपलब्ध'}
                            </Badge>
                        </motion.div>
                    )}

                    <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-balance leading-tight tracking-tight px-4">
                        {t('tagline')}
                    </h2>

                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
                        {language === 'en'
                            ? 'Transform your stadium experience with AI-powered crowd management, real-time navigation, and intelligent group coordination.'
                            : 'AI-संचालित भीड़ प्रबंधन, वास्तविक समय नेविगेशन और बुद्धिमान समूह समन्वय के साथ अपने स्टेडियम अनुभव को बदलें।'}
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            size="lg"
                            onClick={() => navigate('/onboarding')}
                            className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-2xl premium-shadow group w-full md:w-auto"
                        >
                            {t('startExperience')}
                            <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Demo Flow Steps */}
                <motion.div
                    className="max-w-6xl mx-auto mb-16 md:mb-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12 px-4">
                        {language === 'en' ? 'Experience in 3 Simple Steps' : '3 सरल चरणों में अनुभव'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {demoSteps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            >
                                <Card className="relative overflow-hidden glass-card transition-all duration-300 rounded-3xl premium-shadow h-full hover:scale-[1.02]">
                                    <CardContent className="p-6 md:p-8">
                                        <div className="text-5xl md:text-6xl font-bold text-primary/10 mb-3 md:mb-4">{step.number}</div>
                                        <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{step.title}</h4>
                                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    className="max-w-6xl mx-auto pb-16 md:pb-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12 px-4">
                        {language === 'en' ? 'Powerful Features' : 'शक्तिशाली विशेषताएं'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                whileHover={{ y: -4 }}
                            >
                                <Card className="h-full glass-card hover:bg-white/5 transition-all duration-300 rounded-3xl premium-shadow hover:-translate-y-1">
                                    <CardContent className="p-6 md:p-8">
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                                            <feature.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                                        </div>
                                        <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{feature.title}</h4>
                                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    className="text-center pb-12 md:pb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <p className="text-xs md:text-sm text-muted-foreground px-4">
                        {language === 'en'
                            ? 'Powered by Gemini 2.0 Flash Lite • Supporting 18+ Languages'
                            : 'Gemini 2.0 Flash Lite द्वारा संचालित • 18+ भाषाओं का समर्थन'}
                    </p>
                </motion.div>
            </main>
        </div>
    );
}
