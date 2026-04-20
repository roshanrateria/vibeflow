import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Smile, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ChatMessage } from '@/types/types';
import { p2pService } from '@/services/p2pService';

interface ChatPanelProps {
    groupId: string;
    currentUserId: string;
    language: string;
}

export function ChatPanel({ groupId, currentUserId, language }: ChatPanelProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Subscribe to incoming messages
        p2pService.onMessage((message) => {
            setMessages((prev) => [...prev, message]);
        });

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
                senderUsername: 'you',
                content: language === 'en' ? 'Let\'s meet at Food Court A' : 'चलो फूड कोर्ट A पर मिलते हैं',
                timestamp: new Date(Date.now() - 240000),
                type: 'text',
                read: true,
                readBy: ['user-3'],
                delivered: true,
                deliveredTo: ['user-3'],
            },
            {
                id: 'msg-3',
                senderId: 'user-3',
                senderName: 'Member 3',
                senderUsername: 'member3',
                content: language === 'en' ? 'Sounds good! I\'m on my way' : 'अच्छा लगता है! मैं रास्ते में हूं',
                timestamp: new Date(Date.now() - 180000),
                type: 'text',
                read: true,
                readBy: [currentUserId],
                delivered: true,
                deliveredTo: [currentUserId],
            },
        ];
        setMessages(demoMessages);
    }, [currentUserId, language]);

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
            senderUsername: 'you',
            content: inputValue,
            timestamp: new Date(),
            type: 'text',
            read: false,
            readBy: [],
            delivered: false,
            deliveredTo: [],
        };

        setMessages((prev) => [...prev, newMessage]);
        p2pService.broadcastMessage(inputValue);
        setInputValue('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleEmojiClick = () => {
        const emojis = ['👍', '❤️', '😊', '🎉', '👏', '🔥'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        setInputValue((prev) => prev + randomEmoji);
    };

    const handleShareLocation = () => {
        const locationMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: currentUserId,
            senderName: 'You',
            senderUsername: 'you',
            content: language === 'en' ? 'Shared location: Hall 1, Section A' : 'साझा स्थान: हॉल 1, अनुभाग A',
            timestamp: new Date(),
            type: 'location',
            read: false,
            readBy: [],
            delivered: false,
            deliveredTo: [],
        };
        setMessages((prev) => [...prev, locationMessage]);
    };

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
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
                                        <p className="text-xs font-semibold mb-1 opacity-70">{message.senderName}</p>
                                    )}
                                    {message.type === 'location' && (
                                        <div className="flex items-center gap-2 mb-1">
                                            <MapPin className="h-4 w-4" />
                                            <span className="text-xs font-semibold">
                                                {language === 'en' ? 'Location' : 'स्थान'}
                                            </span>
                                        </div>
                                    )}
                                    <p className="text-sm leading-relaxed break-words">{message.content}</p>
                                    <p className="text-xs opacity-60 mt-1">{formatTime(message.timestamp)}</p>
                                </div>
                            </motion.div>
                        ))}
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

                <div className="p-4 border-t border-border bg-background">
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleEmojiClick}
                            className="rounded-2xl shrink-0"
                        >
                            <Smile className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleShareLocation}
                            className="rounded-2xl shrink-0"
                        >
                            <MapPin className="h-4 w-4" />
                        </Button>
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
