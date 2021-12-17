import type { Placement } from '@popperjs/core';
import type { FunctionComponent, RefObject } from 'react';
import React from 'react';

import { ElementPortalV2 } from '../Portals';
import { Toolbar } from '../Menu';

export interface Props {
    className?: string;
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
    placement?: Placement;
}

export const FloatingMenu: FunctionComponent<Props> = ({
    children,
    className,
    containerRef,
    element,
    placement = 'top-end',
}) => (
    <ElementPortalV2 containerRef={containerRef} element={element} placement={placement}>
        <Toolbar className={className}>{children}</Toolbar>
    </ElementPortalV2>
);
