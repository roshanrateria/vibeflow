import { render, screen } from '@testing-library/react';
import QueueCard from './QueueCard';

describe('QueueCard Accessibility & Rendering Validation', () => {
    it('renders queue information and tags correctly', () => {
        const queueItem = {
            id: 'q1',
            name: 'Food Court A',
            category: 'food',
            waitTimes: { 'food': 10 },
            estimatedWait: 10,
            status: 'open',
            crowdLevel: 'low',
            tags: ['Veg', 'Fast Food'],
        };

        render(<QueueCard queue={queueItem as any} onBook={() => {}} language="en" />);

        expect(screen.getByText('Food Court A')).toBeInTheDocument();
        expect(screen.getByText('Veg')).toBeInTheDocument();
        expect(screen.getByText('Fast Food')).toBeInTheDocument();
    });
});
