import { PressContact } from '@prezly/slate-types';
import { ReactNode, RefObject } from 'react';

export interface PressContactsParameters {
    containerRef: RefObject<HTMLElement>;
}

export interface PressContactsExtensionParameters {
    newsroomSettingsUrl: string;
    renderSearch: (searchProps: SearchProps) => ReactNode;
}

export interface SearchProps {
    newsroomSettingsUrl: string;
    onChange: (query: string) => void;
    onSubmit: (contact: PressContact) => void;
}
