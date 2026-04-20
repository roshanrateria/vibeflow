import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { CallState } from '@/types/types';
import { p2pService } from '@/services/p2pService';

interface CallInterfaceProps {
    call: CallState | null;
    onEndCall: () => void;
    language: string;
}

export function CallInterface({ call, onEndCall, language }: CallInterfaceProps) {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isSpeakerOn, setIsSpeakerOn] = useState(true);
    const [callDuration, setCallDuration] = useState(0);

    useEffect(() => {
        if (call?.status === 'active') {
            const interval = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [call?.status]);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleToggleMute = () => {
        setIsMuted(!isMuted);
        // In real implementation, mute/unmute audio track
    };

    const handleToggleVideo = () => {
        setIsVideoOff(!isVideoOff);
        // In real implementation, enable/disable video track
    };

    const handleToggleSpeaker = () => {
        setIsSpeakerOn(!isSpeakerOn);
        // In real implementation, toggle speaker output
    };

    if (!call) return null;

    const getStatusText = () => {
        switch (call.status) {
            case 'ringing':
                return language === 'en' ? 'Calling...' : 'कॉल कर रहे हैं...';
            case 'active':
                return formatDuration(callDuration);
            case 'ended':
                return language === 'en' ? 'Call Ended' : 'कॉल समाप्त';
            case 'declined':
                return language === 'en' ? 'Call Declined' : 'कॉल अस्वीकृत';
            case 'missed':
                return language === 'en' ? 'Missed Call' : 'छूटी हुई कॉल';
            default:
                return '';
        }
    };

    const getStatusColor = () => {
        switch (call.status) {
            case 'ringing':
                return 'bg-yellow-500';
            case 'active':
                return 'bg-green-500';
            case 'ended':
            case 'declined':
            case 'missed':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            >
                <Card className="w-full max-w-md border-0 premium-shadow rounded-3xl overflow-hidden">
                    <CardContent className="p-8">
                        <div className="text-center space-y-6">
                            {/* Call Status Indicator */}
                            <div className="flex justify-center">
                                <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`} />
                            </div>

                            {/* Caller Info */}
                            <div>
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-primary-foreground">
                                        {call.receiverName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{call.receiverName}</h3>
                                <Badge variant="secondary" className="text-sm">
                                    {call.type === 'audio' ? (
                                        <>
                                            <Phone className="h-3 w-3 mr-1" />
                                            {language === 'en' ? 'Voice Call' : 'वॉयस कॉल'}
                                        </>
                                    ) : (
                                        <>
                                            <Video className="h-3 w-3 mr-1" />
                                            {language === 'en' ? 'Video Call' : 'वीडियो कॉल'}
                                        </>
                                    )}
                                </Badge>
                            </div>

                            {/* Call Status */}
                            <p className="text-lg text-muted-foreground">{getStatusText()}</p>

                            {/* Call Controls */}
                            {call.status === 'active' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex justify-center gap-4"
                                >
                                    <Button
                                        variant={isMuted ? 'destructive' : 'outline'}
                                        size="icon"
                                        onClick={handleToggleMute}
                                        className="rounded-full w-14 h-14"
                                    >
                                        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                                    </Button>

                                    {call.type === 'video' && (
                                        <Button
                                            variant={isVideoOff ? 'destructive' : 'outline'}
                                            size="icon"
                                            onClick={handleToggleVideo}
                                            className="rounded-full w-14 h-14"
                                        >
                                            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                                        </Button>
                                    )}

                                    <Button
                                        variant={isSpeakerOn ? 'default' : 'outline'}
                                        size="icon"
                                        onClick={handleToggleSpeaker}
                                        className="rounded-full w-14 h-14"
                                    >
                                        {isSpeakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                                    </Button>
                                </motion.div>
                            )}

                            {/* End Call Button */}
                            {(call.status === 'ringing' || call.status === 'active') && (
                                <Button
                                    variant="destructive"
                                    size="lg"
                                    onClick={onEndCall}
                                    className="rounded-full w-full h-14"
                                >
                                    <PhoneOff className="h-5 w-5 mr-2" />
                                    {language === 'en' ? 'End Call' : 'कॉल समाप्त करें'}
                                </Button>
                            )}

                            {/* Close Button for Ended Calls */}
                            {(call.status === 'ended' || call.status === 'declined' || call.status === 'missed') && (
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={onEndCall}
                                    className="rounded-full w-full h-14"
                                >
                                    {language === 'en' ? 'Close' : 'बंद करें'}
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}
