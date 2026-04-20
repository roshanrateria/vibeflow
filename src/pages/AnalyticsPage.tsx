import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Users, Clock, DollarSign, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
    const { language } = useLanguage();
    const navigate = useNavigate();

    const crowdFlowData = [
        { time: '14:00', density: 45 },
        { time: '15:00', density: 68 },
        { time: '16:00', density: 82 },
        { time: '17:00', density: 95 },
        { time: '18:00', density: 78 },
        { time: '19:00', density: 52 },
    ];

    const handleExportPDF = () => {
        alert(language === 'en' ? 'PDF export feature coming soon!' : 'PDF निर्यात सुविधा जल्द आ रही है!');
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-xl font-bold">
                            {language === 'en' ? 'Analytics Dashboard' : 'विश्लेषण डैशबोर्ड'}
                        </h1>
                    </div>
                    <Button onClick={handleExportPDF}>
                        <Download className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Export PDF' : 'PDF निर्यात करें'}
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {language === 'en' ? 'Total Attendees' : 'कुल उपस्थित'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-primary" />
                                    <span className="text-3xl font-bold">68,542</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {language === 'en' ? 'Avg Wait Time' : 'औसत प्रतीक्षा समय'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <span className="text-3xl font-bold">8.5</span>
                                    <span className="text-muted-foreground">min</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {language === 'en' ? 'Revenue Impact' : 'राजस्व प्रभाव'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-primary" />
                                    <span className="text-3xl font-bold">+28%</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {language === 'en' ? 'Safety Incidents' : 'सुरक्षा घटनाएं'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-density-low" />
                                    <span className="text-3xl font-bold">0</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>{language === 'en' ? 'Crowd Flow Over Time' : 'समय के साथ भीड़ प्रवाह'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={crowdFlowData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                    <XAxis dataKey="time" stroke="hsl(var(--foreground))" />
                                    <YAxis stroke="hsl(var(--foreground))" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '0.5rem',
                                        }}
                                    />
                                    <Bar dataKey="density" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{language === 'en' ? 'Bottleneck Reports' : 'अवरोध रिपोर्ट'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { location: 'Gate 2', time: '16:45', duration: '12 min', resolved: true },
                                    { location: 'Section B', time: '17:20', duration: '8 min', resolved: true },
                                    { location: 'Food Court B', time: '18:00', duration: '15 min', resolved: false },
                                ].map((bottleneck, index) => (
                                    <div
                                        key={`${bottleneck.location}-${index}`}
                                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium">{bottleneck.location}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {bottleneck.time} • {bottleneck.duration}
                                            </p>
                                        </div>
                                        <span
                                            className={`text-xs px-2 py-1 rounded ${bottleneck.resolved
                                                ? 'bg-density-low/20 text-density-low'
                                                : 'bg-density-high/20 text-density-high'
                                                }`}
                                        >
                                            {bottleneck.resolved
                                                ? language === 'en'
                                                    ? 'Resolved'
                                                    : 'हल किया गया'
                                                : language === 'en'
                                                    ? 'Active'
                                                    : 'सक्रिय'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    );
}