import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSelector } from '@/components/LanguageSelector';
import { DemoTip } from '@/components/DemoTip';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/hooks/useLanguage';
import { useSession } from '@/hooks/useSession';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { QrCode, User as UserIcon, Utensils, Upload } from 'lucide-react';
import type { Language } from '@/types/types';

export default function OnboardingPage() {
    const { language, setLanguage, t } = useLanguage();
    const { createSession } = useSession();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [ticketNumber, setTicketNumber] = useState('');
    const [username, setUsername] = useState('');
    const [dietary, setDietary] = useState<string[]>([]);
    const [interests, setInterests] = useState<string[]>([]);
    const [privacyConsent, setPrivacyConsent] = useState(false);

    const handleSubmit = () => {
        const user = {
            id: `user-${Date.now()}`,
            username: username.trim(),
            name: username.trim(),
            language,
            location: { x: 100, y: 200, section: 'A', floor: 1 },
            preferences: {
                dietary: dietary as ('vegan' | 'vegetarian' | 'fast-food' | 'any')[],
                interests: interests as ('merch' | 'replays' | 'stats' | 'games')[],
                privacyConsent,
            },
            sessionId: `session-${Date.now()}`,
            ticketNumber,
        };

        const session = {
            id: user.sessionId,
            userId: user.id,
            startTime: new Date(),
            language,
            venueId: 'bharat-mandapam-001',
            active: true,
        };

        createSession(user, session);
        navigate('/dashboard');
    };

    const dietaryOptions = [
        { value: 'vegan', label: language === 'en' ? 'Vegan' : 'शाकाहारी' },
        { value: 'vegetarian', label: language === 'en' ? 'Vegetarian' : 'शाकाहारी' },
        { value: 'fast-food', label: language === 'en' ? 'Fast Food' : 'फास्ट फूड' },
        { value: 'any', label: language === 'en' ? 'Any' : 'कोई भी' },
    ];

    const interestOptions = [
        { value: 'merch', label: language === 'en' ? 'Merchandise' : 'माल' },
        { value: 'replays', label: language === 'en' ? 'Replays' : 'रीप्ले' },
        { value: 'stats', label: language === 'en' ? 'Statistics' : 'आंकड़े' },
        { value: 'games', label: language === 'en' ? 'Mini Games' : 'मिनी गेम्स' },
    ];

    return (
        <div className="min-h-screen bg-transparent relative z-0 text-foreground">
            <header className="border-b border-white/5 backdrop-blur-2xl bg-black/40">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-bold gradient-text">{t('appName')}</h1>
                    <LanguageSelector value={language} onChange={setLanguage as (lang: Language) => void} />
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {step === 1 && (
                        <DemoTip
                            message={
                                language === 'en'
                                    ? '💡 Demo Tip: Enter any ticket number (e.g., DEMO-2024) to explore the full experience!'
                                    : '💡 डेमो टिप: पूर्ण अनुभव का पता लगाने के लिए कोई भी टिकट नंबर दर्ज करें (जैसे, DEMO-2024)!'
                            }
                            type="info"
                        />
                    )}

                    {step === 2 && (
                        <DemoTip
                            message={
                                language === 'en'
                                    ? '✨ Personalize your experience! Your preferences help us provide better recommendations.'
                                    : '✨ अपना अनुभव वैयक्तिकृत करें! आपकी प्राथमिकताएं हमें बेहतर सिफारिशें प्रदान करने में मदद करती हैं।'
                            }
                            type="success"
                        />
                    )}

                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center gap-2">
                            <div className={`h-2 w-16 rounded-full transition-all ${step === 1 ? 'bg-primary' : 'bg-muted'}`} />
                            <div className={`h-2 w-16 rounded-full transition-all ${step === 2 ? 'bg-primary' : 'bg-muted'}`} />
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-3">
                            {language === 'en' ? `Step ${step} of 2` : `चरण ${step} का 2`}
                        </p>
                    </div>

                    <Card className="glass-card premium-shadow rounded-3xl overflow-hidden">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-2xl md:text-3xl">
                                {step === 1
                                    ? language === 'en'
                                        ? 'Welcome to VibeFlow AI'
                                        : 'VibeFlow AI में आपका स्वागत है'
                                    : language === 'en'
                                        ? 'Personalize Your Experience'
                                        : 'अपना अनुभव वैयक्तिकृत करें'}
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                                {step === 1
                                    ? language === 'en'
                                        ? 'Let\'s get you started with your stadium experience'
                                        : 'आइए आपको अपने स्टेडियम अनुभव के साथ शुरू करें'
                                    : language === 'en'
                                        ? 'Tell us your preferences for a tailored experience'
                                        : 'अनुकूलित अनुभव के लिए हमें अपनी प्राथमिकताएं बताएं'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 px-6 pb-8">{step === 1 && (
                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="space-y-3">
                                    <Label htmlFor="ticket" className="text-base font-medium">
                                        {language === 'en' ? 'Ticket Number' : 'टिकट नंबर'}
                                    </Label>
                                    <div className="flex gap-3">
                                        <Input
                                            id="ticket"
                                            placeholder={language === 'en' ? 'Enter ticket number' : 'टिकट नंबर दर्ज करें'}
                                            value={ticketNumber}
                                            onChange={(e) => setTicketNumber(e.target.value)}
                                            className="rounded-2xl h-12 text-base"
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => alert('QR Scanner coming soon!')}
                                            className="rounded-2xl h-12 w-12 shrink-0"
                                        >
                                            <QrCode className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {language === 'en'
                                            ? 'Enter any ticket number for demo (e.g., DEMO-2024)'
                                            : 'डेमो के लिए कोई भी टिकट नंबर दर्ज करें (जैसे, DEMO-2024)'}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="username" className="text-base font-medium">
                                        {language === 'en' ? 'Username' : 'उपयोगकर्ता नाम'}
                                    </Label>
                                    <div className="flex gap-3">
                                        <Input
                                            id="username"
                                            placeholder={language === 'en' ? 'Choose a username' : 'एक उपयोगकर्ता नाम चुनें'}
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="rounded-2xl h-12 text-base"
                                        />
                                        <div className="rounded-2xl h-12 w-12 shrink-0 bg-primary/10 flex items-center justify-center">
                                            <UserIcon className="h-5 w-5 text-primary" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {language === 'en'
                                            ? 'Required for group chat and coordination'
                                            : 'समूह चैट और समन्वय के लिए आवश्यक'}
                                    </p>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-border" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-card px-3 text-muted-foreground">
                                            {language === 'en' ? 'Or' : 'या'}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-base font-medium">
                                        {language === 'en' ? 'Upload Section Photo' : 'अनुभाग फोटो अपलोड करें'}
                                    </Label>
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-2xl h-12"
                                        onClick={() => alert('Photo upload coming soon!')}
                                    >
                                        <Upload className="h-5 w-5 mr-2" />
                                        {language === 'en' ? 'Upload Photo' : 'फोटो अपलोड करें'}
                                    </Button>
                                </div>

                                <Button
                                    onClick={() => setStep(2)}
                                    className="w-full rounded-2xl h-12 text-base"
                                    disabled={!ticketNumber || !username.trim()}
                                >
                                    {language === 'en' ? 'Continue' : 'जारी रखें'}
                                </Button>
                            </motion.div>
                        )}

                            {step === 2 && (
                                <motion.div
                                    className="space-y-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="space-y-3">
                                        <Label className="text-base font-medium flex items-center gap-2">
                                            <Utensils className="h-5 w-5 text-primary" />
                                            {language === 'en' ? 'Dietary Preferences' : 'आहार प्राथमिकताएं'}
                                        </Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {dietaryOptions.map((option) => (
                                                <Button
                                                    key={option.value}
                                                    variant={dietary.includes(option.value) ? 'default' : 'outline'}
                                                    className="rounded-2xl h-11"
                                                    onClick={() => {
                                                        setDietary((prev) =>
                                                            prev.includes(option.value)
                                                                ? prev.filter((d) => d !== option.value)
                                                                : [...prev, option.value]
                                                        );
                                                    }}
                                                >
                                                    {option.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-base font-medium">
                                            {language === 'en' ? 'Interests' : 'रुचियां'}
                                        </Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {interestOptions.map((option) => (
                                                <Button
                                                    key={option.value}
                                                    variant={interests.includes(option.value) ? 'default' : 'outline'}
                                                    className="rounded-2xl h-11"
                                                    onClick={() => {
                                                        setInterests((prev) =>
                                                            prev.includes(option.value)
                                                                ? prev.filter((i) => i !== option.value)
                                                                : [...prev, option.value]
                                                        );
                                                    }}
                                                >
                                                    {option.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-5 bg-muted/50 rounded-2xl">
                                        <Label htmlFor="privacy" className="text-sm leading-relaxed flex-1 pr-4">
                                            {language === 'en'
                                                ? 'I consent to data processing for personalized experience'
                                                : 'मैं व्यक्तिगत अनुभव के लिए डेटा प्रसंस्करण के लिए सहमत हूं'}
                                        </Label>
                                        <Switch
                                            id="privacy"
                                            checked={privacyConsent}
                                            onCheckedChange={setPrivacyConsent}
                                        />
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            onClick={() => setStep(1)}
                                            className="flex-1 rounded-2xl h-12"
                                        >
                                            {language === 'en' ? 'Back' : 'वापस'}
                                        </Button>
                                        <Button
                                            onClick={handleSubmit}
                                            className="flex-1 rounded-2xl h-12"
                                            disabled={!privacyConsent}
                                        >
                                            {language === 'en' ? 'Start Experience' : 'अनुभव शुरू करें'}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    );
}
