import type { Placement } from '@popperjs/core';
import type { RefObject, ReactNode } from 'react';
import React from 'react';

import { ElementPortalV2 } from '../Portals';

import { Toolbar } from './Toolbar';

export interface Props {
    children: ReactNode;
    className?: string;
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
    placement?: Placement;
}

export function FloatingMenu({
    children,
    className,
    containerRef,
    element,
    placement = 'top-end',
}: Props) {
    return (
        <ElementPortalV2
            containerElement={containerRef.current}
            referenceElement={element}
            placement={placement}
        >
            <Toolbar className={className}>{children}</Toolbar>
        </ElementPortalV2>
    );
}
