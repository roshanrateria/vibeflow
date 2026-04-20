import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import RouteNavigationPage from './pages/RouteNavigationPage';
import QueueBookingPage from './pages/QueueBookingPage';
import GroupManagementPage from './pages/GroupManagementPage';
import AnalyticsPage from './pages/AnalyticsPage';
import type { ReactNode } from 'react';

export interface RouteConfig {
    name: string;
    path: string;
    element: ReactNode;
    visible?: boolean;
    /** Accessible without login. Routes without this flag require authentication. Has no effect when RouteGuard is not in use. */
    public?: boolean;
}

export const routes: RouteConfig[] = [
    {
        name: 'Landing',
        path: '/',
        element: <LandingPage />,
        public: true,
    },
    {
        name: 'Onboarding',
        path: '/onboarding',
        element: <OnboardingPage />,
        public: true,
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        element: <DashboardPage />,
        public: true,
    },
    {
        name: 'Navigation',
        path: '/navigation',
        element: <RouteNavigationPage />,
        public: true,
    },
    {
        name: 'Queue Booking',
        path: '/queue-booking',
        element: <QueueBookingPage />,
        public: true,
    },
    {
        name: 'Group Management',
        path: '/group',
        element: <GroupManagementPage />,
        public: true,
    },
    {
        name: 'Analytics',
        path: '/analytics',
        element: <AnalyticsPage />,
        public: true,
    },
];
