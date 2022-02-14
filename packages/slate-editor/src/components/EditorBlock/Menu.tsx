import type { VirtualElement } from '@popperjs/core';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { Component } from 'react';
import type { Modifier } from 'react-popper';
import { Popper } from 'react-popper';

import styles from './EditorBlock.module.scss';

interface Props {
    children: ReactNode;
    editorElement: HTMLElement;
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

    /**
     * Virtual element to position the popover menu and its arrow
     * into the top right corner of the block container.
     */
    private virtualReferenceElement: VirtualElement = {
        getBoundingClientRect: this.getVirtualReferenceClientRect,
    };

    render() {
        const { children, editorElement } = this.props;
        return (
            <Popper
                referenceElement={this.virtualReferenceElement}
                modifiers={[...MODIFIERS, keepPopoverInEditor(editorElement)]}
                placement="right-start"
            >
                {({ ref, style, arrowProps, placement }) => (
                    <div className={styles.menu} ref={ref} style={style}>
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
                    </div>
                )}
            </Popper>
        );
    }
}

function keepPopoverInEditor(editorElement: HTMLElement): Modifier<'preventOverflow'> {
    return {
        name: 'preventOverflow',
        enabled: true,
        options: {
            altAxis: true,
            boundary: editorElement,
            padding: {
                right: 4,
            },
        },
    };
}
