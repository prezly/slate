import { Placement, VirtualElement } from '@popperjs/core';
import classNames from 'classnames';
import { isEqual } from 'lodash';
import type { Rect } from 'rangefix';
import React, {
    FunctionComponent,
    HTMLAttributes,
    ReactNode,
    RefObject,
    useRef,
    useState,
} from 'react';
import { Modifier, usePopper } from 'react-popper';
import { Portal } from 'react-portal';
import { useMountedState, useRafLoop } from 'react-use';

import './BasePortalV2.scss';

const PREVENT_OVERFLOW_MODIFIER: Modifier<'preventOverflow'> = {
    name: 'preventOverflow',
    options: {
        padding: 8,
        rootBoundary: 'document',
    },
};

const FLIP_MODIFIER: Modifier<'flip'> = {
    enabled: false,
    name: 'flip',
};

export interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    containerRef?: RefObject<HTMLElement>;
    getBoundingClientRect: () => ClientRect | Rect | null;
    placement: Placement;
}

/**
 * Replacement for `BasePortal` using `react-popper` internally.
 */
const BasePortalV2: FunctionComponent<Props> = ({
    children,
    className,
    containerRef,
    getBoundingClientRect,
    placement,
    ...props
}) => {
    const isMounted = useMountedState();
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const lastRectRef = useRef<ClientRect | Rect | null>(getBoundingClientRect());
    const [referenceElement, setReferenceElement] = useState<VirtualElement | null>(null);
    const { attributes, styles } = usePopper(referenceElement, popperElement, {
        modifiers: [FLIP_MODIFIER, PREVENT_OVERFLOW_MODIFIER],
        placement,
    });

    useRafLoop(() => {
        if (!isMounted()) {
            return;
        }

        const rect = getBoundingClientRect();

        // Optimization: do not call `setReferenceElement` on every animation frame to avoid
        // an infinite re-render loop.
        if (isEqual(rect, lastRectRef.current)) {
            return;
        }

        lastRectRef.current = rect;

        if (rect === null) {
            setReferenceElement(null);
        } else {
            const clientRect = { x: 0, y: 0, toJSON: () => null, ...rect };
            setReferenceElement({
                getBoundingClientRect: () => clientRect,
            });
        }
    });

    return (
        <Portal node={containerRef ? containerRef.current : undefined}>
            <div
                {...props}
                {...attributes.popper}
                className={classNames('base-portal-v2', className, {
                    'base-portal-v2--uninitialized': referenceElement === null,
                })}
                ref={setPopperElement}
                style={styles.popper}
            >
                {children}
            </div>
        </Portal>
    );
};

export default BasePortalV2;
