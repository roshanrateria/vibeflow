import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';
import type { SafetyAlert as SafetyAlertType } from '@/types/types';
import { motion } from 'motion/react';

interface SafetyAlertProps {
    alert: SafetyAlertType;
    onDismiss?: () => void;
}

export function SafetyAlert({ alert }: SafetyAlertProps) {
    const severityConfig = {
        low: { icon: Info, variant: 'default' as const, color: 'text-blue-600' },
        medium: { icon: AlertCircle, variant: 'default' as const, color: 'text-yellow-600' },
        high: { icon: AlertTriangle, variant: 'default' as const, color: 'text-orange-600' },
        critical: { icon: AlertTriangle, variant: 'destructive' as const, color: 'text-destructive' },
    };

    const config = severityConfig[alert.severity];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <Alert variant={config.variant} className="mb-4">
                <Icon className={`h-4 w-4 ${config.color}`} />
                <AlertTitle className="font-semibold">
                    {alert.type === 'bottleneck' && 'Bottleneck Detected'}
                    {alert.type === 'high-density' && 'High Crowd Density'}
                    {alert.type === 'emergency' && 'Emergency Alert'}
                    {alert.type === 'redirect' && 'Route Redirect'}
                </AlertTitle>
                <AlertDescription className="text-sm mt-1">{alert.message}</AlertDescription>
            </Alert>
        </motion.div>
    );
}
