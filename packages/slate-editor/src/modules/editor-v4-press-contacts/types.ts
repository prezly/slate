import { ReactNode, RefObject } from 'react';
import { Element } from 'slate';

import { PressContact } from '../../types';

import { PRESS_CONTACT_TYPE } from './constants';

export type PressContactType = typeof PRESS_CONTACT_TYPE;

export interface PressContactElementType extends Element {
    contact: PressContact;
    type: PressContactType;
    uuid: string;
}

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
