import type { Route, CrowdDensity, StaggeredPlan, Location, Language } from '@/types/types';
import {
    demoRoutes,
    demoVibePauseContent,
    generateMockCrowdData,
    isDemoMode,
} from '@/utils/fallbackData';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

interface GeminiRequest {
    contents: {
        parts: {
            text: string;
        }[];
    }[];
}

interface GeminiResponse {
    candidates?: {
        content: {
            parts: {
                text: string;
            }[];
        };
    }[];
}

async function callGeminiAPI(prompt: string): Promise<string> {
    if (isDemoMode()) {
        throw new Error('Demo mode: Gemini API not configured');
    }

    const request: GeminiRequest = {
        contents: [
            {
                parts: [
                    {
                        text: prompt,
                    },
                ],
            },
        ],
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data: GeminiResponse = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// VisionFlow Agent: Analyzes crowd density
export async function analyzeCrowdDensity(imageData?: string): Promise<CrowdDensity[]> {
    try {
        if (isDemoMode() || !imageData) {
            return generateMockCrowdData();
        }

        const prompt = `Analyze this stadium image and provide crowd density data for different sections. 
    Return a JSON array with objects containing: location (x, y, section), level (low/medium/high/critical), 
    percentage (0-100), and trend (increasing/decreasing/stable).`;

        const result = await callGeminiAPI(prompt);
        const parsed = JSON.parse(result);
        return Array.isArray(parsed) ? parsed : generateMockCrowdData();
    } catch {
        return generateMockCrowdData();
    }
}

// PathForge Agent: Generates optimal routes
export async function generateRoute(
    from: Location,
    to: Location,
    crowdData: CrowdDensity[],
    language: Language
): Promise<Route> {
    try {
        if (isDemoMode()) {
            return demoRoutes[0];
        }

        const prompt = `Generate an optimal route from ${JSON.stringify(from)} to ${JSON.stringify(to)} 
    considering crowd density: ${JSON.stringify(crowdData)}. 
    Note: Provide safe and non-congested alternatives if crowdLevel is high!
    Provide step-by-step navigation instructions in ${language}.
    Return JSON with: id, from, to, steps (instruction, location, distance, estimatedTime), 
    estimatedTime, distance, crowdLevel.`;

        const result = await callGeminiAPI(prompt);
        const parsed = JSON.parse(result);
        return parsed || demoRoutes[0];
    } catch {
        return demoRoutes[0];
    }
}

// QueueSync Agent: Manages queue bookings
export async function findOptimalQueue(
    userLocation: Location,
    queueType: 'concession' | 'restroom' | 'merchandise',
    language: Language
): Promise<{
    queueId: string;
    locationName: string;
    estimatedWait: number;
    route: Route;
}> {
    try {
        if (isDemoMode()) {
            return {
                queueId: 'queue-1',
                locationName: 'Food Court A',
                estimatedWait: 8,
                route: demoRoutes[0],
            };
        }

        const prompt = `Find the optimal ${queueType} location for user at ${JSON.stringify(userLocation)}. 
    Consider wait times and distance. Provide response in ${language}.
    Return JSON with: queueId, locationName, estimatedWait, route.`;

        const result = await callGeminiAPI(prompt);
        const parsed = JSON.parse(result);
        return (
            parsed || {
                queueId: 'queue-1',
                locationName: 'Food Court A',
                estimatedWait: 8,
                route: demoRoutes[0],
            }
        );
    } catch {
        return {
            queueId: 'queue-1',
            locationName: 'Food Court A',
            estimatedWait: 8,
            route: demoRoutes[0],
        };
    }
}

// GroupVibe Agent: Coordinates group movements
export async function generateStaggeredPlan(
    groupSize: number,
    currentLocation: Location,
    destination: Location,
    language: Language
): Promise<StaggeredPlan> {
    try {
        if (isDemoMode()) {
            return {
                subgroups: [
                    {
                        members: ['user-1', 'user-2'],
                        departureTime: new Date(Date.now() + 2 * 60000),
                        destination: 'Food Court A',
                        estimatedArrival: new Date(Date.now() + 7 * 60000),
                    },
                    {
                        members: ['user-3', 'user-4'],
                        departureTime: new Date(Date.now() + 8 * 60000),
                        destination: 'Food Court A',
                        estimatedArrival: new Date(Date.now() + 13 * 60000),
                    },
                ],
                rejoinLocation: { x: 150, y: 300, gate: 'Gate 1' },
                estimatedRejoinTime: new Date(Date.now() + 15 * 60000),
            };
        }

        const prompt = `Generate a staggered movement plan for a group of ${groupSize} people 
    moving from ${JSON.stringify(currentLocation)} to ${JSON.stringify(destination)}. 
    Provide instructions in ${language}.
    Return JSON with: subgroups (members, departureTime, destination, estimatedArrival), 
    rejoinLocation, estimatedRejoinTime.`;

        const result = await callGeminiAPI(prompt);
        const parsed = JSON.parse(result);
        return (
            parsed || {
                subgroups: [],
                rejoinLocation: destination,
                estimatedRejoinTime: new Date(Date.now() + 15 * 60000),
            }
        );
    } catch {
        return {
            subgroups: [],
            rejoinLocation: destination,
            estimatedRejoinTime: new Date(Date.now() + 15 * 60000),
        };
    }
}

// Get Vibe Pause content
export async function getVibePauseContent(
    userInterests: string[],
    waitTime: number,
    language: Language
) {
    try {
        if (isDemoMode()) {
            return demoVibePauseContent.filter((content) =>
                userInterests.includes(content.type)
            )[0] || demoVibePauseContent[0];
        }

        const prompt = `Suggest engaging content for a user waiting ${waitTime} minutes. 
    User interests: ${userInterests.join(', ')}. Provide in ${language}.
    Return JSON with: id, type, title, description, content, duration, sponsored.`;

        const result = await callGeminiAPI(prompt);
        const parsed = JSON.parse(result);
        return parsed || demoVibePauseContent[0];
    } catch {
        return demoVibePauseContent[0];
    }
}

// Translate text using Gemini
export async function translateText(text: string, targetLanguage: Language): Promise<string> {
    try {
        if (isDemoMode()) {
            return text;
        }

        const prompt = `Translate the following text to ${targetLanguage}: "${text}"
    Return only the translated text, no explanations.`;

        const result = await callGeminiAPI(prompt);
        return result.trim() || text;
    } catch {
        return text;
    }
}

export const geminiService = {
    analyzeCrowdDensity,
    generateRoute,
    findOptimalQueue,
    generateStaggeredPlan,
    getVibePauseContent,
    translateText,
    isDemoMode,
};
