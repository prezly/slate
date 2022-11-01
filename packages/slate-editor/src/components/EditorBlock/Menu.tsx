import type { Rect } from '@popperjs/core';
import classNames from 'classnames';
import type { MouseEvent, ReactNode } from 'react';
import { useCallback } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';
import type { Modifier } from 'react-popper';
import { Popper } from 'react-popper';

import { Toolbox } from '#components';

import type { PopperOptionsContextType } from '#modules/popper-options-context';

import styles from './Menu.module.scss';

interface Props {
    children: ReactNode;
    className?: string;
    onClick?: (event: MouseEvent) => void;
    popperOptions: PopperOptionsContextType;
    reference: HTMLElement;
}

const TETHER_OFFSET_AMOUNT = 4;
const TETHER_OFFSET_OUTLINE_SIZE = 6;

function getModifiers(popperOptions: PopperOptionsContextType): Modifier<string>[] {
    const { modifiers } = popperOptions;

    return [
        {
            name: 'offset',
            enabled: true,
            options: {
                offset: [-TETHER_OFFSET_OUTLINE_SIZE, 16],
            },
        },
        {
            name: 'flip',
            enabled: Boolean(popperOptions.autoPlacement),
            options: {
                fallbackPlacements: ['left-start', 'right-start'],
            },
        },
        {
            name: 'arrow',
            enabled: true,
            options: {
                padding: 19,
            },
        },
        {
            name: 'preventOverflow',
            enabled: true,
            options: {
                altAxis: true,
                mainAxis: true,
                rootBoundary: 'document',
                padding: {
                    top: 12,
                    right: 12,
                },
                // Make the menu snap to the bottom of the reference element
                // if popper.height < reference.height
                tetherOffset: ({ popper }: { popper: Rect }) => {
                    return popper.height - TETHER_OFFSET_AMOUNT * 2 - TETHER_OFFSET_OUTLINE_SIZE;
                },
                ...modifiers?.preventOverflow,
            },
        },
        {
            name: 'prezly:autoHideArrow',
            enabled: true,
            phase: 'write',
            fn({ state }) {
                const { arrow } = state.elements;

                if (arrow) {
                    if (state.modifiersData.preventOverflow?.x) {
                        arrow.classList.add(styles.hidden);
                    } else {
                        arrow.classList.remove(styles.hidden);
                    }
                }
            },
        },
    ];
}

export function Menu({ children, className, onClick, popperOptions, reference }: Props) {
    const placement = popperOptions.placement ?? 'right-start';

    const getVirtualReferenceClientRect = useCallback((): ClientRect => {
        const container = reference.getBoundingClientRect();

        const rect = {
            top: container.top,
            right: container.right,
            bottom: container.bottom,
            left: container.left,
            x: container.x,
            y: container.y,
            width: container.width,
            height: container.height,
            toJSON() {
                return JSON.stringify(this);
            },
        };

        return {
            ...rect,
            toJSON() {
                return rect;
            },
        };
    }, [reference]);

    function mountPopper(content: ReactNode) {
        if (popperOptions.portalNode?.current) {
            return createPortal(content, popperOptions.portalNode.current);
        }

        return content;
    }

    return (
        <Popper
            referenceElement={{
                getBoundingClientRect: getVirtualReferenceClientRect,
            }}
            modifiers={getModifiers(popperOptions)}
            placement={placement}
            strategy="fixed"
        >
            {({ ref, style, arrowProps, placement }) =>
                mountPopper(
                    <Toolbox.Panel
                        contentEditable={false}
                        className={classNames(className, styles.menu)}
                        ref={ref}
                        style={{
                            ...style,
                            zIndex: popperOptions.zIndex,
                        }}
                        onClick={onClick}
                    >
                        <div
                            className={classNames(styles.arrow, {
                                [styles.top]: placement.indexOf('top') >= 0,
                                [styles.bottom]: placement.indexOf('bottom') >= 0,
                                [styles.left]: placement.indexOf('left') >= 0,
                                [styles.right]: placement.indexOf('right') >= 0,
                            })}
                            {...arrowProps}
                        />
                        {children}
                    </Toolbox.Panel>,
                )
            }
        </Popper>
    );
}
