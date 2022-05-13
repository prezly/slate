import classNames from 'classnames';
import type { MouseEvent, ReactNode } from 'react';
import React, { Component } from 'react';
import type { Modifier } from 'react-popper';
import { Popper } from 'react-popper';

import { Toolbox } from '#components';

import styles from './Menu.module.scss';

interface Props {
    children: ReactNode;
    className?: string;
    onClick?: (event: MouseEvent) => void;
    open: boolean;
    reference: HTMLElement;
}

const VIRTUAL_REFERENCE_SIZE = 42;

const MODIFIERS: Modifier<string>[] = [
    {
        name: 'offset',
        enabled: true,
        options: {
            offset: [-4, 16],
        },
    },
    {
        name: 'flip',
        enabled: false,
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
            mainAxis: false,
            boundary: document.body,
            padding: {
                right: 4,
            },
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

export class Menu extends Component<Props> {
    private getVirtualReferenceClientRect = (): ClientRect => {
        const container = this.props.reference.getBoundingClientRect();
        const rect = {
            top: container.top,
            right: container.right,
            bottom: container.top + VIRTUAL_REFERENCE_SIZE,
            left: container.right - VIRTUAL_REFERENCE_SIZE,
            x: container.right - VIRTUAL_REFERENCE_SIZE,
            y: container.y,
            width: VIRTUAL_REFERENCE_SIZE,
            height: VIRTUAL_REFERENCE_SIZE,
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
        const { children, className, onClick, open } = this.props;

        if (!open) {
            return null;
        }

        return (
            <Popper
                referenceElement={{
                    getBoundingClientRect: this.getVirtualReferenceClientRect,
                }}
                modifiers={MODIFIERS}
                placement="right-start"
            >
                {({ ref, style, arrowProps, placement }) => (
                    <Toolbox.Panel
                        className={classNames(className, styles.menu)}
                        ref={ref}
                        style={style}
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
