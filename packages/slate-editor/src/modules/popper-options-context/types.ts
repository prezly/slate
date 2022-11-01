import type { PreventOverflowModifier } from '@popperjs/core/lib/modifiers/preventOverflow';
import type { RefObject } from 'react';

export interface Context {
    modifiers?: {
        preventOverflow?: PreventOverflowModifier['options'];
    };
    placement?: 'left-start' | 'right-start';
    autoPlacement?: boolean;
    portalNode?: RefObject<HTMLElement | undefined>;
    zIndex?: number;
}
