import classNames from 'classnames';
import type { MouseEvent, ReactNode } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';
import { Popper } from 'react-popper';

import { Toolbox } from '#components';

import type { PopperOptionsContextType } from '#modules/popper-options-context';

import { getMenuPopperModifiers } from './getMenuPopperModifiers';
import styles from './Menu.module.scss';

interface Props {
    children: ReactNode;
    className?: string;
    onClick?: (event: MouseEvent) => void;
    popperOptions: PopperOptionsContextType;
    reference: HTMLElement;
}

export function Menu({ children, className, onClick, popperOptions, reference }: Props) {
    const placement = popperOptions.placement ?? 'right';

    function mountPopper(content: ReactNode) {
        if (popperOptions.portalNode?.current) {
            return createPortal(content, popperOptions.portalNode.current);
        }

        return content;
    }

    return (
        <Popper
            referenceElement={reference}
            modifiers={getMenuPopperModifiers(popperOptions)}
            strategy="fixed"
            placement={placement}
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
