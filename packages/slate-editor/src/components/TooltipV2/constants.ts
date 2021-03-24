import { Modifier } from 'react-popper';

export const DEFAULT_HIDE_DELAY = 0;

export const DEFAULT_SHOW_DELAY = 150;

export const DEFAULT_PREVENT_OVERFLOW_MODIFIER: Modifier<'preventOverflow'> = {
    name: 'preventOverflow',
    options: {
        padding: 4,
        rootBoundary: 'document',
    },
};

export const DEFAULT_FLIP_MODIFIER: Modifier<'flip'> = {
    name: 'flip',
    options: {
        fallbackPlacements: ['top', 'right', 'bottom', 'left'],
        padding: 4,
        rootBoundary: 'document',
    },
};

export const DEFAULT_OFFSET_MODIFIER: Modifier<'offset'> = {
    name: 'offset',
    options: {
        offset: [0, 6],
    },
};
