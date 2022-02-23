import type { Placement, VirtualElement } from '@popperjs/core';
import classNames from 'classnames';
import type { Rect } from 'rangefix';
import type { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { useRef, useState } from 'react';
import type { Modifier } from 'react-popper';
import { usePopper } from 'react-popper';
import { Portal } from 'react-portal';

import { useMountedState, useRafLoop } from '#lib';
import { isEqual } from '#lodash';

import { convertClientRect } from './convertClientRect';

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
    containerElement?: HTMLElement | null | undefined;
    getBoundingClientRect: () => ClientRect | Rect | null;
    modifiers?: Modifier<string>[];
    placement: Placement;
    pointerEvents?: boolean;
}

/**
 * Replacement for `BasePortal` using `react-popper` internally.
 */
export const BasePortalV2: FunctionComponent<Props> = ({
    children,
    className,
    containerElement,
    getBoundingClientRect,
    modifiers = [],
    placement,
    pointerEvents = true,
    ...props
}) => {
    const isMounted = useMountedState();
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const lastRectRef = useRef(convertClientRect(getBoundingClientRect()));

    const [referenceElement, setReferenceElement] = useState<VirtualElement | null>(() => {
        const rect = lastRectRef.current;

        return rect
            ? {
                  getBoundingClientRect: () => rect,
              }
            : null;
    });

    const { attributes, styles } = usePopper(referenceElement, popperElement, {
        modifiers: [FLIP_MODIFIER, PREVENT_OVERFLOW_MODIFIER, ...modifiers],
        placement,
    });

    useRafLoop(() => {
        if (!isMounted()) {
            return;
        }

        const rect = convertClientRect(getBoundingClientRect());

        // Optimization: do not call `setReferenceElement` on every animation frame to avoid
        // an infinite re-render loop.

        if (rect && lastRectRef.current && isEqual(rect, lastRectRef.current)) {
            return;
        }

        lastRectRef.current = rect;

        if (rect === null) {
            setReferenceElement(null);
        } else {
            setReferenceElement({
                getBoundingClientRect: () => rect,
            });
        }
    });

    return (
        <Portal node={containerElement}>
            <div
                {...props}
                {...attributes.popper}
                className={classNames('base-portal-v2', className, {
                    'base-portal-v2--uninitialized': referenceElement === null,
                    'base-portal-v2--no-pointer-events': pointerEvents === false,
                })}
                ref={setPopperElement}
                style={styles.popper}
            >
                {children}
            </div>
        </Portal>
    );
};
