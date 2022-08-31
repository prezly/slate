import type { PressContact } from '@prezly/slate-types';
import type { ReactNode } from 'react';

export interface PressContactsExtensionParameters {
    renderSearch: (searchProps: SearchProps) => ReactNode;
}

export interface SearchProps {
    onChange: (query: string) => void;
    onSubmit: (contact: PressContact) => void;
}
