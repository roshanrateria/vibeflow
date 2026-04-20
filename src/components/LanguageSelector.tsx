import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languageNames } from '@/utils/translations';
import type { Language } from '@/types/types';

interface LanguageSelectorProps {
    value: Language;
    onChange: (language: Language) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
    return (
        <Select value={value} onValueChange={(val) => onChange(val as Language)}>
            <SelectTrigger className="w-40">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(languageNames).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                        {name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
