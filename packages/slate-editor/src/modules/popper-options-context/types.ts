import type { PreventOverflowModifier } from '@popperjs/core/lib/modifiers/preventOverflow';

export interface Context {
    modifiers?: {
        preventOverflow?: PreventOverflowModifier['options'];
    };
    placement?: 'left-start' | 'right-start';
    zIndex?: number;
}
