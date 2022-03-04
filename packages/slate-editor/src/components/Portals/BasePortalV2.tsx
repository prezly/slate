import type { Placement, VirtualElement } from '@popperjs/core';
import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { useRef, useState } from 'react';
import type { Modifier } from 'react-popper';
import { usePopper } from 'react-popper';
import { Portal } from 'react-portal';

import { useMountedState, useRafLoop } from '#lib';
import { isEqual } from '#lodash';

import portalStyles from './BasePortalV2.module.scss';

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
    arrowClassName?: string;
    containerElement?: HTMLElement | null | undefined;
    getBoundingClientRect: () => ClientRect | null;
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
    arrowClassName,
    containerElement,
    getBoundingClientRect,
    modifiers = [],
    placement,
    pointerEvents = true,
    ...props
}) => {
    const [arr, setArr] = useState<HTMLElement | null>(null);
    const isMounted = useMountedState();
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const lastRectRef = useRef(getBoundingClientRect());

    const [referenceElement, setReferenceElement] = useState<VirtualElement | null>(() => {
        const rect = lastRectRef.current;

        return rect
            ? {
                  getBoundingClientRect: () => rect,
              }
            : null;
    });

    const popperModifiers = [FLIP_MODIFIER, PREVENT_OVERFLOW_MODIFIER, ...modifiers];

    if (arrowClassName) {
        popperModifiers.push({
            name: 'arrow',
            enabled: true,
            options: {
                element: arr,
                placement: 'top-start',
            },
        });

        popperModifiers.push({
            name: 'offset',
            enabled: true,
            options: {
                offset: [0, 4],
            },
        });
    }

    const { attributes, styles } = usePopper(referenceElement, popperElement, {
        modifiers: popperModifiers,
        placement,
    });

    useRafLoop(() => {
        if (!isMounted()) {
            return;
        }

        const rect = getBoundingClientRect();

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
                className={classNames(portalStyles['base-portal-v2'], className, {
                    [portalStyles['base-portal-v2--uninitialized']]: referenceElement === null,
                    [portalStyles['base-portal-v2--no-pointer-events']]: pointerEvents === false,
                })}
                ref={setPopperElement}
                style={styles.popper}
            >
                {arrowClassName && (
                    <div
                        ref={setArr}
                        className={classNames(arrowClassName, portalStyles.arrow, {
                            [portalStyles.top]: placement.indexOf('top') >= 0,
                            [portalStyles.bottom]: placement.indexOf('bottom') >= 0,
                            [portalStyles.left]: placement.indexOf('left') >= 0,
                            [portalStyles.right]: placement.indexOf('right') >= 0,
                        })}
                        style={styles.arrow}
                    />
                )}

                {children}
            </div>
        </Portal>
    );
};
