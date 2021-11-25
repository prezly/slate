import type { Placement, VirtualElement } from '@popperjs/core';
import classNames from 'classnames';
import { isEqual, noop } from 'lodash';
import type { Rect } from 'rangefix';
import type {
    FunctionComponent,
    HTMLAttributes,
    ReactNode,
    RefObject} from 'react';
import React, {
    useRef,
    useState,
} from 'react';
import type { Modifier} from 'react-popper';
import { usePopper } from 'react-popper';
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
            /**
             * We have to manually re-create a ClientRect-shape object instead of `...rect`,
             * as `DOMRect` object properties are not enumerable.
             * @see https://github.com/microsoft/TypeScript/issues/9726
             */
            const clientRect: ClientRect = {
                x: 'x' in rect ? rect.x : rect.left,
                y: 'y' in rect ? rect.y : rect.top,
                left: rect.left,
                right: rect.right,
                top: rect.top,
                bottom: rect.bottom,
                width: rect.width,
                height: rect.height,
                toJSON: noop,
            };
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
