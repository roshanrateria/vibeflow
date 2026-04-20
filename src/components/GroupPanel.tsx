import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin } from 'lucide-react';
import type { Group } from '@/types/types';
import { motion } from 'motion/react';

interface GroupPanelProps {
    group: Group;
    language: string;
}

export function GroupPanel({ group, language }: GroupPanelProps) {
    const statusColors = {
        online: 'bg-density-low',
        offline: 'bg-muted',
        moving: 'bg-density-medium',
        waiting: 'bg-density-high',
    };

    const titleText = language === 'en' ? 'Group Members' : 'समूह के सदस्य';

    return (
        <Card className="border-0 premium-shadow rounded-3xl overflow-hidden">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {titleText}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {group.members.map((member, index) => (
                    <motion.div
                        key={member.userId}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl hover:bg-muted/70 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${statusColors[member.status]}`} />
                            <div>
                                <p className="font-medium text-sm">{member.name}</p>
                                {member.role && (
                                    <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{member.location.section || 'Unknown'}</span>
                        </div>
                    </motion.div>
                ))}

                {group.staggeredPlan && (
                    <div className="mt-4 p-4 bg-accent/50 rounded-2xl">
                        <p className="text-sm font-semibold mb-2">
                            {language === 'en' ? 'Staggered Plan' : 'चरणबद्ध योजना'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {language === 'en' ? 'Rejoin at:' : 'पुनः मिलें:'}{' '}
                            {group.staggeredPlan.rejoinLocation.gate || 'Location'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {language === 'en' ? 'Estimated time:' : 'अनुमानित समय:'}{' '}
                            {new Date(group.staggeredPlan.estimatedRejoinTime).toLocaleTimeString()}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
