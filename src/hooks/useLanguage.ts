import { useState, useEffect } from 'react';
import type { Language } from '@/types/types';
import { storageService } from '@/services/storageService';
import { translate } from '@/utils/translations';

export function useLanguage() {
    const [language, setLanguage] = useState<Language>(
        (storageService.getLanguage() as Language) || 'en'
    );

    useEffect(() => {
        storageService.saveLanguage(language);
    }, [language]);

    const t = (key: string): string => {
        return translate(key, language);
    };

    return {
        language,
        setLanguage,
        t,
    };
}
