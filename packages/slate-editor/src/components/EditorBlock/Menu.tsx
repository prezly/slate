import type { Rect } from '@popperjs/core';
import classNames from 'classnames';
import type { MouseEvent, ReactNode } from 'react';
import React, { Component } from 'react';
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
            enabled: false,
            options: {
                fallbackPlacements: ['left-start'],
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

export class Menu extends Component<Props> {
    private getVirtualReferenceClientRect = (): ClientRect => {
        const container = this.props.reference.getBoundingClientRect();
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
    };

    render() {
        const { children, className, onClick, popperOptions } = this.props;
        const placement = popperOptions.placement || 'right-start';

        return (
            <Popper
                referenceElement={{
                    getBoundingClientRect: this.getVirtualReferenceClientRect,
                }}
                modifiers={getModifiers(popperOptions)}
                placement={placement}
                strategy="fixed"
            >
                {({ ref, style, arrowProps, placement }) => (
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
                    </Toolbox.Panel>
                )}
            </Popper>
        );
    }
}
