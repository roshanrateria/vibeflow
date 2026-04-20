import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QRCodeDataUrl from '@/components/ui/qrcodedataurl';
import { X, Download, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { QRCodeData } from '@/types/types';

interface QRCodeDisplayProps {
    qrData: QRCodeData;
    onClose: () => void;
    language: string;
}

export function QRCodeDisplay({ qrData, onClose, language }: QRCodeDisplayProps) {
    const qrString = JSON.stringify(qrData);

    const handleDownload = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `vibeflow-group-${qrData.groupId}.png`;
            link.href = url;
            link.click();
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: language === 'en' ? 'Join my VibeFlow group!' : 'मेरे VibeFlow समूह में शामिल हों!',
                    text: language === 'en'
                        ? `Scan this QR code to join ${qrData.groupName}`
                        : `${qrData.groupName} में शामिल होने के लिए इस QR कोड को स्कैन करें`,
                });
            } catch (error) {
                console.log('Share cancelled');
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <Card className="w-full max-w-sm border-0 premium-shadow rounded-3xl overflow-hidden">
                    <CardHeader className="pb-4 border-b border-border">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl">
                                {language === 'en' ? 'Group QR Code' : 'समूह QR कोड'}
                            </CardTitle>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-8 space-y-6">
                        <div className="bg-white p-6 rounded-2xl flex items-center justify-center">
                            <QRCodeDataUrl text={qrString} width={220} />
                        </div>

                        <div className="text-center space-y-2">
                            <p className="font-semibold text-lg">{qrData.groupName}</p>
                            <p className="text-sm text-muted-foreground">
                                {language === 'en'
                                    ? 'Scan this code to join the group'
                                    : 'समूह में शामिल होने के लिए इस कोड को स्कैन करें'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                @{qrData.username}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                onClick={handleDownload}
                                className="rounded-2xl h-11"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                {language === 'en' ? 'Download' : 'डाउनलोड'}
                            </Button>
                            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                                <Button
                                    variant="outline"
                                    onClick={handleShare}
                                    className="rounded-2xl h-11"
                                >
                                    <Share2 className="h-4 w-4 mr-2" />
                                    {language === 'en' ? 'Share' : 'साझा करें'}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}