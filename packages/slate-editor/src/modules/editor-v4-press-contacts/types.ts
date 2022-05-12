import type { PressContact } from '@prezly/slate-types';
import type { ReactNode } from 'react';

export interface PressContactsExtensionParameters {
    newsroomSettingsUrl: string;
    renderSearch: (searchProps: SearchProps) => ReactNode;
}

export interface SearchProps {
    newsroomSettingsUrl: string;
    onChange: (query: string) => void;
    onSubmit: (contact: PressContact) => void;
}
