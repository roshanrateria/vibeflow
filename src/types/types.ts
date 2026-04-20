// Core type definitions for VibeFlow AI

export type Language =
    | 'en'
    | 'hi'
    | 'bn'
    | 'ta'
    | 'te'
    | 'mr'
    | 'gu'
    | 'kn'
    | 'ml'
    | 'pa'
    | 'or'
    | 'as'
    | 'ur';

export type DensityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Location {
    x: number;
    y: number;
    section?: string;
    gate?: string;
    floor?: number;
}

export interface User {
    id: string;
    username: string; // Required for P2P group communication
    name?: string;
    language: Language;
    location: Location;
    preferences: UserPreferences;
    sessionId: string;
    ticketNumber?: string;
}

export interface UserPreferences {
    dietary?: ('vegan' | 'vegetarian' | 'fast-food' | 'any')[];
    interests?: ('merch' | 'replays' | 'stats' | 'games')[];
    privacyConsent: boolean;
}

export interface Session {
    id: string;
    userId: string;
    startTime: Date;
    language: Language;
    venueId: string;
    active: boolean;
}

export interface Group {
    id: string;
    name: string;
    members: GroupMember[];
    createdBy: string;
    shareLink: string;
    staggeredPlan?: StaggeredPlan;
}

export interface GroupMember {
    id: string;
    userId: string;
    username: string;
    name: string;
    displayName: string; // May have suffix like John_1, John_2
    location: Location;
    status: 'online' | 'offline' | 'moving' | 'waiting';
    role?: 'leader' | 'food-runner' | 'seat-holder' | 'member';
    joinedAt: Date;
    isOnline: boolean;
    lastSeen?: Date;
}

export interface StaggeredPlan {
    subgroups: Subgroup[];
    rejoinLocation: Location;
    estimatedRejoinTime: Date;
}

export interface Subgroup {
    members: string[];
    departureTime: Date;
    destination: string;
    estimatedArrival: Date;
}

export interface Queue {
    id: string;
    locationId: string;
    locationType: 'concession' | 'restroom' | 'merchandise';
    locationName: string;
    currentWaitTime: number;
    capacity: number;
    currentOccupancy: number;
    availableSlots: TimeSlot[];
    tags?: string[];
}

export interface TimeSlot {
    id: string;
    time: Date;
    available: boolean;
    estimatedWait: number;
}

export interface QueueBooking {
    id: string;
    userId: string;
    queueId: string;
    slotId: string;
    bookingTime: Date;
    pickupTime: Date;
    status: 'active' | 'completed' | 'cancelled' | 'expired';
    autoRescheduled?: boolean;
}

export interface Route {
    id: string;
    from: Location;
    to: Location;
    steps: RouteStep[];
    estimatedTime: number;
    distance: number;
    crowdLevel: DensityLevel;
    alternatives?: Route[];
    safetyAlerts?: SafetyAlert[];
}

export interface RouteStep {
    instruction: string;
    location: Location;
    distance: number;
    estimatedTime: number;
}

export interface SafetyAlert {
    id: string;
    type: 'bottleneck' | 'high-density' | 'emergency' | 'redirect';
    severity: 'low' | 'medium' | 'high' | 'critical';
    location: Location;
    message: string;
    alternativeRoutes?: Route[];
    timestamp: Date;
}

export interface CrowdDensity {
    location: Location;
    level: DensityLevel;
    percentage: number;
    timestamp: Date;
    trend?: 'increasing' | 'decreasing' | 'stable';
}

export interface VenueMap {
    id: string;
    name: string;
    capacity: number;
    sections: VenueSection[];
    amenities: Amenity[];
    gates: Gate[];
    heatmap: CrowdDensity[];
}

export interface VenueSection {
    id: string;
    name: string;
    location: Location;
    capacity: number;
    currentOccupancy: number;
    type: 'seating' | 'standing' | 'vip' | 'general';
}

export interface Amenity {
    id: string;
    type: 'concession' | 'restroom' | 'merchandise' | 'first-aid' | 'info';
    name: string;
    location: Location;
    currentWaitTime?: number;
    open: boolean;
}

export interface Gate {
    id: string;
    name: string;
    location: Location;
    status: 'open' | 'closed' | 'congested';
}

export interface VibePauseContent {
    id: string;
    type: 'replay' | 'stats' | 'mini-game' | 'sponsor';
    title: string;
    description: string;
    content: string;
    duration: number;
    sponsored?: boolean;
}

// P2P Communication Types
export interface ChatMessage {
    id: string;
    senderId: string;
    senderName: string;
    senderUsername: string;
    content: string;
    timestamp: Date;
    type: 'text' | 'emoji' | 'location' | 'system' | 'audio' | 'video' | 'image';
    mediaUrl?: string;
    mediaDuration?: number; // For audio/video messages in seconds
    replyTo?: {
        messageId: string;
        senderName: string;
        content: string;
    };
    read: boolean;
    readBy: string[]; // Array of user IDs who read the message
    delivered: boolean;
    deliveredTo: string[]; // Array of user IDs who received the message
}

export interface QRCodeData {
    userId: string;
    username: string;
    groupId: string;
    groupName: string;
    timestamp: number;
    version: string;
}

export interface CallState {
    id: string;
    callerId: string;
    callerName: string;
    receiverId: string;
    receiverName: string;
    type: 'audio' | 'video';
    status: 'ringing' | 'active' | 'ended' | 'declined' | 'missed';
    startTime?: Date;
    endTime?: Date;
    duration?: number;
}

export interface PeerConnection {
    peerId: string;
    peerName: string;
    connectionState: 'connecting' | 'connected' | 'disconnected' | 'failed';
    dataChannel?: RTCDataChannel;
    peerConnection?: RTCPeerConnection;
    localStream?: MediaStream;
    remoteStream?: MediaStream;
}

export interface SignalingMessage {
    type: 'offer' | 'answer' | 'ice-candidate' | 'join' | 'leave' | 'chat' | 'call-request' | 'call-response';
    from: string;
    to: string;
    data: unknown;
    timestamp: Date;
}

export interface GroupChat {
    groupId: string;
    messages: ChatMessage[];
    participants: string[];
    typingUsers: string[];
    unreadCount: number;
}

export interface AgentResponse {
    agentType: 'VisionFlow' | 'PathForge' | 'QueueSync' | 'GroupVibe';
    success: boolean;
    data: unknown;
    message?: string;
    timestamp: Date;
}

export interface Analytics {
    venueId: string;
    date: Date;
    totalAttendees: number;
    averageWaitTime: number;
    bottlenecks: BottleneckReport[];
    concessionRevenue: number;
    safetyIncidents: number;
    userSatisfaction?: number;
}

export interface BottleneckReport {
    location: Location;
    peakTime: Date;
    maxDensity: number;
    duration: number;
    resolved: boolean;
}

export interface Translation {
    [key: string]: {
        [lang in Language]: string;
    };
}
