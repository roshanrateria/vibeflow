import type {
    VenueMap,
    CrowdDensity,
    Queue,
    Route,
    VibePauseContent,
    Amenity,
    VenueSection,
    Gate,
    Location,
} from '@/types/types';

// Fallback demo data for when Gemini API is unavailable

export const demoVenueMap: VenueMap = {
    id: 'bharat-mandapam-001',
    name: 'Bharat Mandapam',
    capacity: 15000,
    sections: [
        {
            id: 'hall-1',
            name: 'Main Hall 1',
            location: { x: 150, y: 200, section: 'Hall 1', floor: 1 },
            capacity: 7000,
            currentOccupancy: 5200,
            type: 'seating',
        },
        {
            id: 'hall-2',
            name: 'Main Hall 2',
            location: { x: 450, y: 200, section: 'Hall 2', floor: 1 },
            capacity: 5000,
            currentOccupancy: 3800,
            type: 'seating',
        },
        {
            id: 'hall-3',
            name: 'Exhibition Hall 3',
            location: { x: 300, y: 350, section: 'Hall 3', floor: 2 },
            capacity: 3000,
            currentOccupancy: 2100,
            type: 'standing',
        },
        {
            id: 'vip-lounge',
            name: 'VIP Lounge',
            location: { x: 300, y: 80, section: 'VIP', floor: 3 },
            capacity: 500,
            currentOccupancy: 420,
            type: 'vip',
        },
    ] as VenueSection[],
    amenities: [
        {
            id: 'food-court-a',
            type: 'concession',
            name: 'Food Court A - North Wing',
            location: { x: 120, y: 150, gate: 'Gate 1' },
            currentWaitTime: 12,
            open: true,
        },
        {
            id: 'food-court-b',
            type: 'concession',
            name: 'Food Court B - South Wing',
            location: { x: 480, y: 280, gate: 'Gate 2' },
            currentWaitTime: 8,
            open: true,
        },
        {
            id: 'merch-1',
            type: 'merchandise',
            name: 'Official Merchandise Store 1',
            location: { x: 200, y: 120, gate: 'Gate 1' },
            currentWaitTime: 15,
            open: true,
        },
        {
            id: 'merch-2',
            type: 'merchandise',
            name: 'Official Merchandise Store 2',
            location: { x: 400, y: 320, gate: 'Gate 3' },
            currentWaitTime: 10,
            open: true,
        },
        {
            id: 'restroom-m1',
            type: 'restroom',
            name: 'Men\'s Restroom - Level 1 North',
            location: { x: 100, y: 180, floor: 1 },
            currentWaitTime: 3,
            open: true,
        },
        {
            id: 'restroom-w1',
            type: 'restroom',
            name: 'Women\'s Restroom - Level 1 North',
            location: { x: 140, y: 180, floor: 1 },
            currentWaitTime: 5,
            open: true,
        },
        {
            id: 'restroom-m2',
            type: 'restroom',
            name: 'Men\'s Restroom - Level 1 South',
            location: { x: 460, y: 250, floor: 1 },
            currentWaitTime: 2,
            open: true,
        },
        {
            id: 'restroom-w2',
            type: 'restroom',
            name: 'Women\'s Restroom - Level 1 South',
            location: { x: 500, y: 250, floor: 1 },
            currentWaitTime: 4,
            open: true,
        },
        {
            id: 'medical-1',
            type: 'medical',
            name: 'Medical Center - Main',
            location: { x: 250, y: 100, floor: 1 },
            currentWaitTime: 0,
            open: true,
        },
        {
            id: 'info-desk',
            type: 'info',
            name: 'Information Desk',
            location: { x: 300, y: 140, floor: 1 },
            currentWaitTime: 0,
            open: true,
        },
    ] as Amenity[],
    gates: [
        {
            id: 'gate-1',
            name: 'Gate 1 - Main Entrance (North)',
            location: { x: 100, y: 50 },
            status: 'open',
        },
        {
            id: 'gate-2',
            name: 'Gate 2 - East Entrance',
            location: { x: 550, y: 200 },
            status: 'open',
        },
        {
            id: 'gate-3',
            name: 'Gate 3 - South Entrance',
            location: { x: 300, y: 400 },
            status: 'congested',
        },
        {
            id: 'gate-4',
            name: 'Gate 4 - VIP Entrance (West)',
            location: { x: 50, y: 200 },
            status: 'open',
        },
    ] as Gate[],
    heatmap: [
        { location: { x: 150, y: 200, section: 'Hall 1' }, level: 'high', percentage: 74, timestamp: new Date(), trend: 'stable' },
        { location: { x: 450, y: 200, section: 'Hall 2' }, level: 'high', percentage: 76, timestamp: new Date(), trend: 'increasing' },
        { location: { x: 300, y: 350, section: 'Hall 3' }, level: 'medium', percentage: 70, timestamp: new Date(), trend: 'stable' },
        { location: { x: 120, y: 150, section: 'Food Court A' }, level: 'medium', percentage: 65, timestamp: new Date(), trend: 'decreasing' },
        { location: { x: 480, y: 280, section: 'Food Court B' }, level: 'low', percentage: 45, timestamp: new Date(), trend: 'stable' },
        { location: { x: 200, y: 120, section: 'Merch 1' }, level: 'critical', percentage: 82, timestamp: new Date(), trend: 'increasing' },
        { location: { x: 100, y: 50, section: 'Gate 1' }, level: 'medium', percentage: 58, timestamp: new Date(), trend: 'stable' },
        { location: { x: 300, y: 400, section: 'Gate 3' }, level: 'critical', percentage: 88, timestamp: new Date(), trend: 'increasing' },
        { location: { x: 300, y: 80, section: 'VIP' }, level: 'critical', percentage: 84, timestamp: new Date(), trend: 'stable' },
    ] as CrowdDensity[],
};

export const demoQueues: Queue[] = [
    {
        id: 'queue-1',
        locationId: 'con-1',
        locationType: 'concession',
        locationName: 'Food Court A',
        currentWaitTime: 8,
        capacity: 50,
        currentOccupancy: 32,
        tags: ['Veg', 'Vegan Options', 'Beverages'],
        availableSlots: [
            {
                id: 'slot-1',
                time: new Date(Date.now() + 5 * 60000),
                available: true,
                estimatedWait: 5,
            },
            {
                id: 'slot-2',
                time: new Date(Date.now() + 10 * 60000),
                available: true,
                estimatedWait: 3,
            },
        ],
    },
    {
        id: 'queue-2',
        locationId: 'con-2',
        locationType: 'concession',
        locationName: 'Food Court B',
        currentWaitTime: 15,
        capacity: 50,
        currentOccupancy: 45,
        tags: ['Non-Veg', 'Fast Food'],
        availableSlots: [
            {
                id: 'slot-3',
                time: new Date(Date.now() + 12 * 60000),
                available: true,
                estimatedWait: 10,
            },
        ],
    },
    {
        id: 'queue-3',
        locationId: 'rest-1',
        locationType: 'restroom',
        locationName: 'Restroom Block 1',
        currentWaitTime: 5,
        capacity: 30,
        currentOccupancy: 18,
        tags: ['All Access', 'Accessible'],
        availableSlots: [
            {
                id: 'slot-4',
                time: new Date(Date.now() + 3 * 60000),
                available: true,
                estimatedWait: 2,
            },
        ],
    },
    {
        id: 'queue-4',
        locationId: 'merch-1',
        locationType: 'merchandise',
        locationName: 'Team Store',
        currentWaitTime: 20,
        capacity: 40,
        currentOccupancy: 38,
        tags: ['Apparel', 'Accessories'],
        availableSlots: [
            {
                id: 'slot-5',
                time: new Date(Date.now() + 18 * 60000),
                available: true,
                estimatedWait: 15,
            },
        ],
    },
];

export const demoRoutes: Route[] = [
    {
        id: 'route-1',
        from: { x: 100, y: 200, section: 'A' },
        to: { x: 150, y: 300, gate: 'Gate 1' },
        steps: [
            {
                instruction: 'Exit Section A via Aisle 3',
                location: { x: 100, y: 220 },
                distance: 20,
                estimatedTime: 1,
            },
            {
                instruction: 'Turn right towards Gate 1',
                location: { x: 120, y: 260 },
                distance: 50,
                estimatedTime: 2,
            },
            {
                instruction: 'Arrive at Food Court A',
                location: { x: 150, y: 300 },
                distance: 40,
                estimatedTime: 2,
            },
        ],
        estimatedTime: 5,
        distance: 110,
        crowdLevel: 'low',
    },
    {
        id: 'route-2',
        from: { x: 300, y: 200, section: 'B' },
        to: { x: 450, y: 300, gate: 'Gate 3' },
        steps: [
            {
                instruction: 'Exit Section B via Aisle 7',
                location: { x: 300, y: 220 },
                distance: 20,
                estimatedTime: 2,
            },
            {
                instruction: 'Navigate through main concourse (high density)',
                location: { x: 350, y: 260 },
                distance: 70,
                estimatedTime: 5,
            },
            {
                instruction: 'Arrive at Food Court B',
                location: { x: 450, y: 300 },
                distance: 100,
                estimatedTime: 3,
            },
        ],
        estimatedTime: 10,
        distance: 190,
        crowdLevel: 'high',
    },
];

export const demoVibePauseContent: VibePauseContent[] = [
    {
        id: 'vibe-1',
        type: 'replay',
        title: 'Amazing Goal Replay',
        description: 'Watch the incredible goal from the first half',
        content: 'replay-video-url',
        duration: 45,
        sponsored: false,
    },
    {
        id: 'vibe-2',
        type: 'stats',
        title: 'Player Statistics',
        description: 'Top performers of the match',
        content: 'stats-data',
        duration: 30,
        sponsored: false,
    },
    {
        id: 'vibe-3',
        type: 'mini-game',
        title: 'Predict Next Play',
        description: 'Test your sports knowledge',
        content: 'game-url',
        duration: 60,
        sponsored: false,
    },
    {
        id: 'vibe-4',
        type: 'sponsor',
        title: 'Special Offer',
        description: 'Get 20% off at the Team Store',
        content: 'sponsor-offer',
        duration: 20,
        sponsored: true,
    },
];

export function generateMockCrowdData(): CrowdDensity[] {
    const locations: Location[] = [
        { x: 100, y: 200, section: 'A' },
        { x: 300, y: 200, section: 'B' },
        { x: 500, y: 200, section: 'C' },
        { x: 150, y: 300, gate: 'Gate 1' },
        { x: 300, y: 450, gate: 'Gate 2' },
        { x: 450, y: 300, gate: 'Gate 3' },
    ];

    return locations.map((location) => {
        const percentage = Math.floor(Math.random() * 100);
        let level: 'low' | 'medium' | 'high' | 'critical';

        if (percentage < 30) level = 'low';
        else if (percentage < 60) level = 'medium';
        else if (percentage < 85) level = 'high';
        else level = 'critical';

        return {
            location,
            level,
            percentage,
            timestamp: new Date(),
            trend: ['increasing', 'decreasing', 'stable'][Math.floor(Math.random() * 3)] as
                | 'increasing'
                | 'decreasing'
                | 'stable',
        };
    });
}

export const isDemoMode = (): boolean => {
    return !import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === '';
};
