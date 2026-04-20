import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChatPanelEnhanced } from '@/components/ChatPanelEnhanced';
import { CallInterface } from '@/components/CallInterface';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';
import { QRScanner } from '@/components/QRScanner';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useSession } from '@/hooks/useSession';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, QrCode, Camera, Phone, Video, MessageCircle, Users, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { p2pService } from '@/services/p2pService';
import type { CallState, QRCodeData, GroupMember } from '@/types/types';

export default function GroupManagementPage() {
    const { language, t } = useLanguage();
    const { user } = useSession();
    const navigate = useNavigate();

    const [hasGroup, setHasGroup] = useState(false);
    const [groupData, setGroupData] = useState<QRCodeData | null>(null);
    const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
    const [showQR, setShowQR] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [activeCall, setActiveCall] = useState<CallState | null>(null);

    useEffect(() => {
        // Initialize P2P service
        if (user) {
            p2pService.initialize(user.id, user.username || user.name || 'User');

            // Listen for incoming calls
            p2pService.onCall((call) => {
                setActiveCall(call);
                if (call.status === 'ringing') {
                    toast.info(
                        language === 'en'
                            ? `Incoming ${call.type} call from ${call.callerName}`
                            : `${call.callerName} से आने वाली ${call.type} कॉल`
                    );
                }
            });

            // Check if user already has a group in localStorage
            const savedGroup = localStorage.getItem(`vibeflow_group_${user.id}`);
            if (savedGroup) {
                const parsed = JSON.parse(savedGroup);
                setGroupData(parsed);
                setHasGroup(true);

                // Load group members
                const savedMembers = localStorage.getItem(`vibeflow_members_${parsed.groupId}`);
                if (savedMembers) {
                    setGroupMembers(JSON.parse(savedMembers));
                }
            }
        }
    }, [user, language]);

    const handleCreateGroup = () => {
        if (!user) return;

        const newGroupData: QRCodeData = {
            userId: user.id,
            username: user.username || user.name || 'User',
            groupId: `group-${user.id}`,
            groupName: `${user.username || user.name}'s Group`,
            timestamp: Date.now(),
            version: '1.0',
        };

        // Add creator as first member
        const creatorMember: GroupMember = {
            id: user.id,
            userId: user.id,
            username: user.username || user.name || 'User',
            name: user.username || user.name || 'User',
            displayName: user.username || user.name || 'User',
            location: { x: 100, y: 200, section: 'A', floor: 1 },
            status: 'online',
            joinedAt: new Date(),
            isOnline: true,
        };

        setGroupData(newGroupData);
        setGroupMembers([creatorMember]);
        setHasGroup(true);
        setShowQR(true);

        // Save to localStorage
        localStorage.setItem(`vibeflow_group_${user.id}`, JSON.stringify(newGroupData));
        localStorage.setItem(`vibeflow_members_${newGroupData.groupId}`, JSON.stringify([creatorMember]));

        toast.success(
            language === 'en'
                ? 'Group created! Share the QR code with others'
                : 'समूह बनाया गया! दूसरों के साथ QR कोड साझा करें'
        );
    };

    const handleJoinGroup = (scannedData: QRCodeData) => {
        if (!user) return;

        // Check for duplicate username
        const existingMembers = JSON.parse(
            localStorage.getItem(`vibeflow_members_${scannedData.groupId}`) || '[]'
        ) as GroupMember[];

        let displayName = user.username || user.name || 'User';
        const duplicateCount = existingMembers.filter(m =>
            m.username === displayName
        ).length;

        if (duplicateCount > 0) {
            displayName = `${displayName}_${duplicateCount + 1}`;
            toast.info(
                language === 'en'
                    ? `Username already exists. You'll be shown as ${displayName}`
                    : `उपयोगकर्ता नाम पहले से मौजूद है। आपको ${displayName} के रूप में दिखाया जाएगा`
            );
        }

        const newMember: GroupMember = {
            id: user.id,
            userId: user.id,
            username: user.username || user.name || 'User',
            name: user.username || user.name || 'User',
            displayName,
            location: { x: 100, y: 200, section: 'A', floor: 1 },
            status: 'online',
            joinedAt: new Date(),
            isOnline: true,
        };

        const updatedMembers = [...existingMembers, newMember];

        setGroupData(scannedData);
        setGroupMembers(updatedMembers);
        setHasGroup(true);
        setShowScanner(false);

        // Save to localStorage
        localStorage.setItem(`vibeflow_group_${user.id}`, JSON.stringify(scannedData));
        localStorage.setItem(`vibeflow_members_${scannedData.groupId}`, JSON.stringify(updatedMembers));

        toast.success(
            language === 'en'
                ? `Joined ${scannedData.groupName}!`
                : `${scannedData.groupName} में शामिल हुए!`
        );
    };

    const handleVoiceCall = async () => {
        try {
            const call = await p2pService.initiateCall('user-2', 'audio');
            setActiveCall(call);
            toast.success(language === 'en' ? 'Starting voice call...' : 'वॉयस कॉल शुरू हो रही है...');
        } catch (error) {
            toast.error(language === 'en' ? 'Failed to start call' : 'कॉल शुरू करने में विफल');
        }
    };

    const handleVideoCall = async () => {
        try {
            const call = await p2pService.initiateCall('user-2', 'video');
            setActiveCall(call);
            toast.success(language === 'en' ? 'Starting video call...' : 'वीडियो कॉल शुरू हो रही है...');
        } catch (error) {
            toast.error(language === 'en' ? 'Failed to start call' : 'कॉल शुरू करने में विफल');
        }
    };

    const handleEndCall = () => {
        if (activeCall) {
            p2pService.endCall(activeCall.id);
            setActiveCall(null);
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-foreground relative z-0 flex flex-col">
            <header className="border-b border-white/5 backdrop-blur-2xl bg-black/40 sticky top-0 z-50 shrink-0">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="rounded-2xl">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-bold">{t('groupCoordination')}</h1>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl flex flex-col h-[calc(100vh-80px)]">
                <motion.div
                    className="flex-1 flex flex-col md:flex-row gap-6 min-h-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {!hasGroup ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <Card className="glass-card premium-shadow rounded-3xl max-w-md mx-auto w-full">
                                <CardHeader>
                                    <CardTitle className="text-center text-2xl font-bold">
                                        {language === 'en' ? 'Group Coordination' : 'समूह समन्वय'}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 p-8">
                                    <p className="text-center text-muted-foreground text-sm mb-6">
                                        {language === 'en'
                                            ? 'Create a group or join an existing one using QR code to start communicating.'
                                            : 'QR कोड का उपयोग करके एक समूह बनाएं या मौजूदा समूह में शामिल हों'}
                                    </p>

                                    <Button
                                        onClick={handleCreateGroup}
                                        className="w-full rounded-2xl h-14 text-base bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
                                    >
                                        <UserPlus className="h-5 w-5 mr-2" />
                                        {language === 'en' ? 'Create New Group' : 'समूह बनाएं'}
                                    </Button>

                                    <div className="relative py-4">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-white/10" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase font-semibold">
                                            <span className="bg-background px-4 text-muted-foreground backdrop-blur-xl rounded-full">
                                                {language === 'en' ? 'Or' : 'या'}
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        onClick={() => setShowScanner(true)}
                                        className="w-full rounded-2xl h-14 text-base border-white/10 hover:bg-white/5"
                                    >
                                        <Camera className="h-5 w-5 mr-2" />
                                        {language === 'en' ? 'Scan to Join Group' : 'समूह में शामिल हों'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0 bg-black/20 rounded-3xl overflow-hidden glass-card border border-white/5 premium-shadow">
                            {/* Left Sidebar - Group Info & Actions */}
                            <div className="w-full md:w-80 border-r border-white/5 flex flex-col bg-white/[0.02]">
                                <div className="p-6 border-b border-white/5 shrink-0">
                                    <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                                        <Users className="h-5 w-5 text-primary" />
                                        {groupData?.groupName}
                                    </h2>
                                    
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handleVoiceCall}
                                            variant="secondary"
                                            className="flex-1 rounded-xl h-10 bg-white/5 hover:bg-white/10"
                                        >
                                            <Phone className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            onClick={handleVideoCall}
                                            variant="secondary"
                                            className="flex-1 rounded-xl h-10 bg-white/5 hover:bg-white/10"
                                        >
                                            <Video className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            onClick={() => setShowQR(true)}
                                            variant="secondary"
                                            className="flex-1 rounded-xl h-10 bg-white/5 hover:bg-white/10"
                                        >
                                            <QrCode className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
                                        {language === 'en' ? 'Members' : 'सदस्य'} — {groupMembers.length}
                                    </p>
                                    {groupMembers.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                                                        <span className="text-sm font-semibold text-primary">
                                                            {member.displayName.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${member.isOnline ? 'bg-green-500' : 'bg-zinc-500'}`} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm leading-none mb-1">{member.displayName}</p>
                                                    <p className="text-xs text-muted-foreground">@{member.username}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Area - Custom Chat Interface */}
                            <div className="flex-1 flex flex-col bg-transparent relative">
                                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
                                </div>
                                <div className="flex-1 relative z-10 flex flex-col h-full w-full">
                                    <ChatPanelEnhanced
                                        groupId={groupData?.groupId || ''}
                                        currentUserId={user?.id || 'user-1'}
                                        currentUsername={user?.username || user?.name || 'User'}
                                        language={language}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </main>

            <AnimatePresence>
                {showQR && groupData && (
                    <QRCodeDisplay
                        qrData={groupData}
                        onClose={() => setShowQR(false)}
                        language={language}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showScanner && (
                    <QRScanner
                        onScan={handleJoinGroup}
                        onClose={() => setShowScanner(false)}
                        language={language}
                    />
                )}
            </AnimatePresence>

            {activeCall && (
                <CallInterface
                    call={activeCall}
                    onEndCall={handleEndCall}
                    language={language}
                />
            )}
        </div>
    );
}
