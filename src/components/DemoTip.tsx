import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { motion } from 'motion/react';

interface DemoTipProps {
    message: string;
    type?: 'info' | 'success' | 'warning';
}

export function DemoTip({ message, type = 'info' }: DemoTipProps) {
    const colors = {
        info: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
        success: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800',
        warning: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800',
    };

    const iconColors = {
        info: 'text-blue-600 dark:text-blue-400',
        success: 'text-green-600 dark:text-green-400',
        warning: 'text-yellow-600 dark:text-yellow-400',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
        >
            <Card className={`${colors[type]} border-2 rounded-2xl premium-shadow`}>
                <CardContent className="p-4 flex items-start gap-3">
                    <Info className={`h-5 w-5 ${iconColors[type]} shrink-0 mt-0.5`} />
                    <p className="text-sm leading-relaxed">{message}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
}

