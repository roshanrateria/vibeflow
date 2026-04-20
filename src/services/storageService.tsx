import type { User, Session, Group, QueueBooking } from '@/types/types';

const STORAGE_KEYS = {
    USER: 'vibeflow_user',
    SESSION: 'vibeflow_session',
    GROUP: 'vibeflow_group',
    BOOKINGS: 'vibeflow_bookings',
    LANGUAGE: 'vibeflow_language',
} as const;

export const storageService = {
    // User management
    saveUser(user: User): void {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    },

    getUser(): User | null {
        const data = localStorage.getItem(STORAGE_KEYS.USER);
        return data ? JSON.parse(data) : null;
    },

    clearUser(): void {
        localStorage.removeItem(STORAGE_KEYS.USER);
    },

    // Session management
    saveSession(session: Session): void {
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    },

    getSession(): Session | null {
        const data = localStorage.getItem(STORAGE_KEYS.SESSION);
        return data ? JSON.parse(data) : null;
    },

    clearSession(): void {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
    },

    // Group management
    saveGroup(group: Group): void {
        localStorage.setItem(STORAGE_KEYS.GROUP, JSON.stringify(group));
    },

    getGroup(): Group | null {
        const data = localStorage.getItem(STORAGE_KEYS.GROUP);
        return data ? JSON.parse(data) : null;
    },

    clearGroup(): void {
        localStorage.removeItem(STORAGE_KEYS.GROUP);
    },

    // Queue bookings
    saveBookings(bookings: QueueBooking[]): void {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    },

    getBookings(): QueueBooking[] {
        const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
        return data ? JSON.parse(data) : [];
    },

    addBooking(booking: QueueBooking): void {
        const bookings = this.getBookings();
        bookings.push(booking);
        this.saveBookings(bookings);
    },

    clearBookings(): void {
        localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    },

    // Language preference
    saveLanguage(language: string): void {
        localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
    },

    getLanguage(): string {
        return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en';
    },

    // Clear all data
    clearAll(): void {
        Object.values(STORAGE_KEYS).forEach((key) => {
            localStorage.removeItem(key);
        });
    },
};
