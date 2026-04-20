import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Camera, Upload } from 'lucide-react';
import { motion } from 'motion/react';
import type { QRCodeData } from '@/types/types';

interface QRScannerProps {
    onScan: (data: QRCodeData) => void;
    onClose: () => void;
    language: string;
}

export function QRScanner({ onScan, onClose, language }: QRScannerProps) {
    const [scanning, setScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            // Cleanup: stop video stream when component unmounts
            if (videoRef.current?.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startCamera = async () => {
        try {
            setError(null);
            setScanning(true);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            setError(language === 'en' ? 'Camera access denied' : 'कैमरा एक्सेस अस्वीकृत');
            setScanning(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setScanning(false);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // In a real implementation, you would use a QR code library to decode the image
        // For demo, we'll simulate a successful scan
        setTimeout(() => {
            const demoQRData: QRCodeData = {
                userId: 'user-demo',
                username: 'DemoUser',
                groupId: 'group-demo',
                groupName: 'Demo Group',
                timestamp: Date.now(),
                version: '1.0',
            };
            onScan(demoQRData);
        }, 1000);
    };

    const handleManualEntry = () => {
        // For demo purposes, simulate scanning a QR code
        const demoQRData: QRCodeData = {
            userId: 'user-demo',
            username: 'DemoUser',
            groupId: 'group-demo',
            groupName: 'Demo Group',
            timestamp: Date.now(),
            version: '1.0',
        };
        onScan(demoQRData);
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
                className="w-full max-w-md"
            >
                <Card className="border-0 premium-shadow rounded-3xl overflow-hidden">
                    <CardHeader className="pb-4 border-b border-border">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl">
                                {language === 'en' ? 'Scan QR Code' : 'QR कोड स्कैन करें'}
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    stopCamera();
                                    onClose();
                                }}
                                className="rounded-full"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-4">
                        {!scanning ? (
                            <>
                                <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground px-4">
                                            {language === 'en'
                                                ? 'Position the QR code within the frame'
                                                : 'QR कोड को फ्रेम के भीतर रखें'}
                                        </p>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 bg-destructive/10 text-destructive rounded-2xl text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <Button
                                        onClick={startCamera}
                                        className="w-full rounded-2xl h-12"
                                    >
                                        <Camera className="h-4 w-4 mr-2" />
                                        {language === 'en' ? 'Start Camera' : 'कैमरा शुरू करें'}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full rounded-2xl h-12"
                                    >
                                        <Upload className="h-4 w-4 mr-2" />
                                        {language === 'en' ? 'Upload QR Image' : 'QR छवि अपलोड करें'}
                                    </Button>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-border" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-card px-2 text-muted-foreground">
                                                {language === 'en' ? 'Demo Mode' : 'डेमो मोड'}
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        variant="secondary"
                                        onClick={handleManualEntry}
                                        className="w-full rounded-2xl h-12"
                                    >
                                        {language === 'en' ? 'Join Demo Group' : 'डेमो समूह में शामिल हों'}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="aspect-square bg-black rounded-2xl overflow-hidden relative">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-48 h-48 border-4 border-primary rounded-2xl" />
                                    </div>
                                </div>

                                <Button
                                    variant="destructive"
                                    onClick={stopCamera}
                                    className="w-full rounded-2xl h-12"
                                >
                                    {language === 'en' ? 'Stop Camera' : 'कैमरा बंद करें'}
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
