import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { VibePauseContent } from '@/types/types';
import { Play, BarChart3, Gamepad2, Tag } from 'lucide-react';
import { motion } from 'motion/react';

interface VibePauseCardProps {
    content: VibePauseContent;
}

export function VibePauseCard({ content }: VibePauseCardProps) {
    const iconMap = {
        replay: Play,
        stats: BarChart3,
        'mini-game': Gamepad2,
        sponsor: Tag,
    };

    const Icon = iconMap[content.type];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="glass-card premium-shadow rounded-2xl overflow-hidden hover:scale-[1.02] cursor-pointer transition-transform duration-300">
                <CardHeader className="pb-3 border-b border-white/5">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <Icon className="h-5 w-5 text-primary" />
                            <CardTitle className="text-base">{content.title}</CardTitle>
                        </div>
                        {content.sponsored && (
                            <Badge variant="secondary" className="text-xs">
                                Sponsored
                            </Badge>
                        )}
                    </div>
                    <CardDescription className="text-sm">{content.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{content.duration}s</span>
                        <span className="capitalize">{content.type.replace('-', ' ')}</span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
