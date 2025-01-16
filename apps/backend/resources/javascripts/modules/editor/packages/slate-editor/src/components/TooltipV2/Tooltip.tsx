import classNames from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import React, { useState } from 'react';
import type { Modifier } from 'react-popper';
import { usePopper } from 'react-popper';
import { Portal } from 'react-portal';

import { useDelayedTooltip, useMountedState, useRafLoop, useUniqueId } from '#lib';

import {
    DEFAULT_FLIP_MODIFIER,
    DEFAULT_HIDE_DELAY,
    DEFAULT_OFFSET_MODIFIER,
    DEFAULT_PREVENT_OVERFLOW_MODIFIER,
    DEFAULT_SHOW_DELAY,
} from './constants';
import styles from './Tooltip.module.scss';

interface ChildrenProps {
    /**
     * Pass these attributes as props to the element that the tooltip is for.
     */
    ariaAttributes: {
        'aria-describedby'?: string;
    };
    /**
     * Call this function any time tooltip should be hidden.
     * Usually it will be onMouseLeave / onMouseOut / onBlur.
     */
    onHide: () => void;
    /**
     * Call this function any time tooltip should be shown.
     * Usually it will be onMouseEnter / onMouseOver / onFocus.
     */
    onShow: () => void;
    /**
     * Set the reference to the HTML element the tooltip should be positioned against.
     */
    setReferenceElement: (referenceElement: HTMLElement | null) => void;
}

export interface Props {
    autoUpdatePosition?: boolean;
    children: (props: ChildrenProps) => ReactNode;
    className?: string;
    defaultShow?: boolean;
    enabled?: boolean;
    flip?: Modifier<'flip'>;
    hideDelay?: number;
    offset?: Modifier<'offset'>;
    placement?: 'top' | 'right' | 'bottom' | 'left';
    preventOverflow?: Modifier<'preventOverflow'>;
    showDelay?: number;
    tooltip?: ReactNode;
}

export const Tooltip: FunctionComponent<Props> = ({
    autoUpdatePosition = false,
    children,
    className,
    defaultShow,
    enabled = true,
    flip = {},
    hideDelay = DEFAULT_HIDE_DELAY,
    offset = {},
    placement = 'top',
    preventOverflow = {},
    showDelay = DEFAULT_SHOW_DELAY,
    tooltip,
}) => {
    const id = useUniqueId('tooltip-v2');
    const [{ show }, { onHide, onShow }] = useDelayedTooltip({ defaultShow, hideDelay, showDelay });
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const {
        attributes,
        styles: inlineStyles,
        update,
    } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [
            { name: 'arrow', options: { element: arrowElement } },
            {
                ...DEFAULT_PREVENT_OVERFLOW_MODIFIER,
                ...preventOverflow,
                options: {
                    ...DEFAULT_PREVENT_OVERFLOW_MODIFIER.options,
                    ...preventOverflow.options,
                },
            },
            {
                ...DEFAULT_FLIP_MODIFIER,
                ...flip,
                options: {
                    ...DEFAULT_FLIP_MODIFIER.options,
                    ...flip.options,
                },
            },
            {
                ...DEFAULT_OFFSET_MODIFIER,
                ...offset,
                options: {
                    ...DEFAULT_OFFSET_MODIFIER.options,
                    ...offset.options,
                },
            },
        ],
    });
    const computedPlacement = attributes.popper?.['data-popper-placement'] ?? placement;

    const isMounted = useMountedState();

    useRafLoop(() => {
        if (autoUpdatePosition && isMounted() && update) {
            update();
        }
    });

    return (
        <>
            {children({
                ariaAttributes: show ? { 'aria-describedby': id } : {},
                onHide,
                onShow,
                setReferenceElement,
            })}

            {show && tooltip !== undefined && tooltip !== null && tooltip !== false && enabled && (
                <Portal>
                    <div
                        {...attributes.popper}
                        className={classNames(styles.Tooltip, className, {
                            [styles.top]: computedPlacement === 'top',
                            [styles.bottom]: computedPlacement === 'bottom',
                            [styles.left]: computedPlacement === 'left',
                            [styles.right]: computedPlacement === 'right',
                        })}
                        onMouseEnter={onShow}
                        onMouseLeave={onHide}
                        ref={setPopperElement}
                        style={inlineStyles.popper}
                    >
                        <div
                            className={styles.Arrow}
                            ref={setArrowElement}
                            style={inlineStyles.arrow}
                        />

                        <div className={styles.Content} id={id}>
                            {tooltip}
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
};
