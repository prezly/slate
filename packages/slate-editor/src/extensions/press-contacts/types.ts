import type { NewsroomContact } from '@prezly/sdk';
import type { ContactInfo } from '@prezly/slate-types';
import type { ReactNode } from 'react';

export interface PressContactsExtensionParameters {
    renderSearch: (searchProps: SearchProps) => ReactNode;
}

export interface SearchProps {
    onChange: (query: string) => void;
    onClose: () => void;
    onSubmit: (id: NewsroomContact['uuid'], contact: ContactInfo) => void;
}