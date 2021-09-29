import { PressContact } from '@prezly/slate-types';
import { ReactNode, RefObject } from 'react';

import { PRESS_CONTACT_TYPE } from './constants';

export type PressContactType = typeof PRESS_CONTACT_TYPE;

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
