import type * as Popper from '@popperjs/core';
import type { ArrowModifier } from '@popperjs/core/lib/modifiers/arrow';
import type { PreventOverflowModifier } from '@popperjs/core/lib/modifiers/preventOverflow';
import type { RefObject } from 'react';

export interface Context {
    modifiers?: {
        arrow?: ArrowModifier['options'];
        preventOverflow?: PreventOverflowModifier['options'];
    };
    placement?: Popper.Placement;
    autoPlacement?: boolean;
    portalNode?: RefObject<HTMLElement | undefined>;
    zIndex?: number;
}
