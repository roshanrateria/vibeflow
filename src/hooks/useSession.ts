import { useState, useEffect } from 'react';
import type { User, Session } from '@/types/types';
import { storageService } from '@/services/storageService';

export function useSession() {
    const [user, setUser] = useState<User | null>(storageService.getUser());
    const [session, setSession] = useState<Session | null>(storageService.getSession());

    useEffect(() => {
        if (user) {
            storageService.saveUser(user);
        }
    }, [user]);

    useEffect(() => {
        if (session) {
            storageService.saveSession(session);
        }
    }, [session]);

    const createSession = (userData: User, sessionData: Session) => {
        setUser(userData);
        setSession(sessionData);
    };

    const endSession = () => {
        setUser(null);
        setSession(null);
        storageService.clearAll();
    };

    const updateUser = (updates: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
        }
    };

    return {
        user,
        session,
        createSession,
        endSession,
        updateUser,
        isAuthenticated: !!user && !!session,
    };
}
