import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Smile, MapPin, Image as ImageIcon, Mic, Video as VideoIcon, Reply, Check, CheckCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ChatMessage } from '@/types/types';
import { p2pService } from '@/services/p2pService';

interface ChatPanelEnhancedProps {
    groupId: string;
    currentUserId: string;
    currentUsername: string;
    language: string;
}

export function ChatPanelEnhanced({ groupId, currentUserId, currentUsername, language }: ChatPanelEnhancedProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load messages from localStorage
        const savedMessages = localStorage.getItem(`vibeflow_chat_${groupId}`);
        if (savedMessages) {
            const parsed = JSON.parse(savedMessages);
            setMessages(parsed.map((m: ChatMessage) => ({
                ...m,
                timestamp: new Date(m.timestamp),
            })));
        } else {
            // Load demo messages
            const demoMessages: ChatMessage[] = [
                {
                    id: 'msg-1',
                    senderId: 'user-2',
                    senderName: 'Member 2',
                    senderUsername: 'member2',
                    content: language === 'en' ? 'Hey everyone! Where should we meet?' : 'अरे सभी! हमें कहाँ मिलना चाहिए?',
                    timestamp: new Date(Date.now() - 300000),
                    type: 'text',
                    read: true,
                    readBy: [currentUserId],
                    delivered: true,
                    deliveredTo: [currentUserId],
                },
                {
                    id: 'msg-2',
                    senderId: currentUserId,
                    senderName: 'You',
                    senderUsername: currentUsername,
                    content: language === 'en' ? 'Let\'s meet at Food Court A' : 'चलो फूड कोर्ट A पर मिलते हैं',
                    timestamp: new Date(Date.now() - 240000),
                    type: 'text',
                    read: true,
                    readBy: ['user-2', 'user-3'],
                    delivered: true,
                    deliveredTo: ['user-2', 'user-3'],
                },
            ];
            setMessages(demoMessages);
        }

        // Subscribe to incoming messages
        p2pService.onMessage((message) => {
            setMessages((prev) => {
                const updated = [...prev, message];
                localStorage.setItem(`vibeflow_chat_${groupId}`, JSON.stringify(updated));
                return updated;
            });
        });
    }, [groupId, currentUserId, currentUsername, language]);

    useEffect(() => {
        // Auto-scroll to bottom when new messages arrive
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: currentUserId,
            senderName: 'You',
            senderUsername: currentUsername,
            content: inputValue,
            timestamp: new Date(),
            type: 'text',
            replyTo: replyingTo ? {
                messageId: replyingTo.id,
                senderName: replyingTo.senderName,
                content: replyingTo.content,
            } : undefined,
            read: false,
            readBy: [],
            delivered: false,
            deliveredTo: [],
        };

        const updated = [...messages, newMessage];
        setMessages(updated);
        localStorage.setItem(`vibeflow_chat_${groupId}`, JSON.stringify(updated));

        p2pService.broadcastMessage(inputValue);
        setInputValue('');
        setReplyingTo(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleEmojiClick = () => {
        const emojis = ['👍', '❤️', '😊', '🎉', '👏', '🔥', '✨', '💯'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        setInputValue((prev) => prev + randomEmoji);
    };

    const handleShareLocation = () => {
        const locationMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: currentUserId,
            senderName: 'You',
            senderUsername: currentUsername,
            content: language === 'en' ? 'Shared location: Hall 1, Section A' : 'साझा स्थान: हॉल 1, अनुभाग A',
            timestamp: new Date(),
            type: 'location',
            read: false,
            readBy: [],
            delivered: false,
            deliveredTo: [],
        };

        const updated = [...messages, locationMessage];
        setMessages(updated);
        localStorage.setItem(`vibeflow_chat_${groupId}`, JSON.stringify(updated));
    };

    const handleImageUpload = () => {
        // Simulate image upload
        const imageMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: currentUserId,
            senderName: 'You',
            senderUsername: currentUsername,
            content: language === 'en' ? 'Shared an image' : 'एक छवि साझा की',
            timestamp: new Date(),
            type: 'image',
            mediaUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
            read: false,
            readBy: [],
            delivered: false,
            deliveredTo: [],
        };

        const updated = [...messages, imageMessage];
        setMessages(updated);
        localStorage.setItem(`vibeflow_chat_${groupId}`, JSON.stringify(updated));
    };

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date: Date) => {
        const today = new Date();
        const messageDate = new Date(date);

        if (messageDate.toDateString() === today.toDateString()) {
            return language === 'en' ? 'Today' : 'आज';
        }

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (messageDate.toDateString() === yesterday.toDateString()) {
            return language === 'en' ? 'Yesterday' : 'कल';
        }

        return messageDate.toLocaleDateString();
    };

    return (
        <Card className="border-0 premium-shadow rounded-3xl overflow-hidden h-full flex flex-col">
            <CardHeader className="pb-3 border-b border-border">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    {language === 'en' ? 'Group Chat' : 'समूह चैट'}
                    <Badge variant="secondary" className="ml-auto">
                        {messages.length}
                    </Badge>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                    <AnimatePresence>
                        {messages.map((message, index) => {
                            const showDate = index === 0 ||
                                formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);

                            return (
                                <div key={message.id}>
                                    {showDate && (
                                        <div className="flex justify-center my-4">
                                            <Badge variant="secondary" className="text-xs">
                                                {formatDate(message.timestamp)}
                                            </Badge>
                                        </div>
                                    )}

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`mb-4 flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[75%] md:max-w-[70%] rounded-2xl px-4 py-3 ${message.senderId === currentUserId
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                                }`}
                                        >
                                            {message.senderId !== currentUserId && (
                                                <p className="text-xs font-semibold mb-1 opacity-70">
                                                    {message.senderName}
                                                </p>
                                            )}

                                            {message.replyTo && (
                                                <div className="mb-2 p-2 rounded-lg bg-black/10 border-l-2 border-current">
                                                    <p className="text-xs font-semibold opacity-70">{message.replyTo.senderName}</p>
                                                    <p className="text-xs opacity-60 truncate">{message.replyTo.content}</p>
                                                </div>
                                            )}

                                            {message.type === 'location' && (
                                                <div className="flex items-center gap-2 mb-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span className="text-xs font-semibold">
                                                        {language === 'en' ? 'Location' : 'स्थान'}
                                                    </span>
                                                </div>
                                            )}

                                            {message.type === 'image' && message.mediaUrl && (
                                                <div className="mb-2">
                                                    <img
                                                        src={message.mediaUrl}
                                                        alt="Shared"
                                                        className="rounded-lg max-w-full h-auto"
                                                    />
                                                </div>
                                            )}

                                            {message.type === 'audio' && (
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Mic className="h-4 w-4" />
                                                    <span className="text-xs">
                                                        {language === 'en' ? 'Voice message' : 'वॉयस संदेश'} ({message.mediaDuration}s)
                                                    </span>
                                                </div>
                                            )}

                                            {message.type === 'video' && (
                                                <div className="flex items-center gap-2 mb-1">
                                                    <VideoIcon className="h-4 w-4" />
                                                    <span className="text-xs">
                                                        {language === 'en' ? 'Video message' : 'वीडियो संदेश'}
                                                    </span>
                                                </div>
                                            )}

                                            <p className="text-sm leading-relaxed break-words">{message.content}</p>

                                            <div className="flex items-center justify-end gap-1 mt-1">
                                                <p className="text-xs opacity-60">{formatTime(message.timestamp)}</p>
                                                {message.senderId === currentUserId && (
                                                    <span className="opacity-60">
                                                        {message.readBy.length > 0 ? (
                                                            <CheckCheck className="h-3 w-3 text-blue-400" />
                                                        ) : message.delivered ? (
                                                            <CheckCheck className="h-3 w-3" />
                                                        ) : (
                                                            <Check className="h-3 w-3" />
                                                        )}
                                                    </span>
                                                )}
                                            </div>

                                            {message.senderId !== currentUserId && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setReplyingTo(message)}
                                                    className="mt-1 h-6 text-xs opacity-60 hover:opacity-100"
                                                >
                                                    <Reply className="h-3 w-3 mr-1" />
                                                    {language === 'en' ? 'Reply' : 'जवाब दें'}
                                                </Button>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </AnimatePresence>

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-sm text-muted-foreground mb-4"
                        >
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                            </div>
                            <span>{language === 'en' ? 'Someone is typing...' : 'कोई टाइप कर रहा है...'}</span>
                        </motion.div>
                    )}
                </ScrollArea>

                {replyingTo && (
                    <div className="px-4 py-2 bg-muted/50 border-t border-border flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-primary">
                                {language === 'en' ? 'Replying to' : 'जवाब दे रहे हैं'} {replyingTo.senderName}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">{replyingTo.content}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setReplyingTo(null)}
                            className="shrink-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                <div className="p-4 border-t border-border bg-background">
                    <div className="flex gap-2 mb-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleImageUpload}
                            className="rounded-2xl shrink-0"
                        >
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleShareLocation}
                            className="rounded-2xl shrink-0"
                        >
                            <MapPin className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleEmojiClick}
                            className="rounded-2xl shrink-0"
                        >
                            <Smile className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={language === 'en' ? 'Type a message...' : 'एक संदेश टाइप करें...'}
                            className="rounded-2xl flex-1"
                        />
                        <Button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            className="rounded-2xl shrink-0"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
